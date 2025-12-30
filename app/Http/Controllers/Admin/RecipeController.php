<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{Recipe, Category, Ingredient, Direction, Nutrition, SectionIngredient};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class RecipeController extends Controller
{
    /**
     * Recipes list.
     */
    public function index(Request $request)
    {
        $query = Recipe::with('author', 'categories')->latest();

        if ($request->filled('search')) {
            $query->where(function ($sub) use ($request) {
                $sub->where('title', 'LIKE', "%{$request->search}%")
                    ->orWhere('description', 'LIKE', "%{$request->search}%");
            });
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('category_id')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('categories.id', $request->category_id);
            });
        }

        return Inertia::render('Admin/Recipes/List', [
            'recipes' => $query->paginate(10)->withQueryString(),
            'categories'  => Category::select('id','name')->get(),
        ]);
    }

    /**
     * Show create form.
     */
    public function create()
    {
        return Inertia::render('Admin/Recipes/Create', [
            'categories'  => Category::select('id','name')->get(), //
            'ingredientsList' => Ingredient::select('id','name')->get(), //
            'sectionsList' => SectionIngredient::select('id','nom_section')->get(), //
            // 'sectionsForRecipe' => Recipe::with(['sections.ingredientsForRecipe.ingredient'])->get()

        ]);
    }

    /**
     * Store recipe.
     */
    public function store(Request $request)
    {
        $validated = $this->validateRecipe($request);
        try {
            DB::beginTransaction();

            if ($request->hasFile('front_image')) {
                $validated['front_image'] = $request->file('front_image')
                    ->store('recipes', 'public');
            }

            $validated['author_id'] = Auth::id();
            $recipe = Recipe::create($validated);
            $recipe->update(['total_time' => $recipe->prep_time + $recipe->cook_time]);

            // CATEGORIES
            $recipe->categories()->sync($validated['categories']);

            // INGREDIENTS
            $pivotData = [];
            foreach ($validated['ingredients'] as $item) {

                if (($item['section_id'] ?? null) === "new" && !empty($item['newSection'])) {
                    $section = SectionIngredient::create(['nom_section' => $item['newSection']]);
                    $item['section_id'] = $section->id;
                }

                if (($item['id'] ?? null) === "new" && !empty($item['newIngredient'])) {
                    $ingredient = Ingredient::create(['name' => $item['newIngredient']]);
                    $item['id'] = $ingredient->id;
                }

                if (!empty($item['id'])) {
                    $pivotData[$item['id']] = [
                        'quantity' => $item['quantity'] ?: null,
                        'is_optional' => (bool) ($item['is_optional'] ?? false),
                        'section_ingredient_id' => $item['section_id'] ?: null,
                    ];
                }
            }
            $recipe->ingredients()->sync($pivotData);

            // DIRECTIONS
            foreach ($request->directions as $index => $dir) {
                $imagePath = isset($dir['direction_image'])
                    ? $dir['direction_image']->store('directions', 'public')
                    : null;

                $recipe->directions()->create([
                    'step_number' => $index + 1,
                    'step_title' => $dir['step_title'],
                    'instruction' => $dir['instruction'],
                    'direction_image' => $imagePath
                ]);
            }

            if (!empty($validated['nutrition'])) {
                $recipe->nutrition()->create($validated['nutrition']);
            }

            DB::commit();
            return redirect()->route('admin.dashboard')->with('success', 'Recette créée avec succès !');

        } catch (\Throwable $e) {
            DB::rollBack();
            report($e); // Log pour debug
            return back()->withErrors(['server' => "Une erreur serveur s'est produite"])
                        ->withInput();
        }
    }

    /**
     * Edit page.
     */
    public function edit(Recipe $recipe)
    {
        $recipe->load('categories','ingredients','directions','nutrition');

        return Inertia::render('Admin/Recipes/Edit', [
            'recipe'      => $recipe,
            'categories'  => Category::select('id','name')->get(),
            'ingredients' => Ingredient::select('id','name')->get(),
        ]);
    }

    /**
     * Update recipe.
     */
    public function update(Request $request, Recipe $recipe)
    {
        $validated = $this->validateRecipe($request);

        DB::transaction(function () use ($recipe, $validated, $request) {

            // Replace image recette si nouvelle envoyée
            if ($request->hasFile('front_image')) {
                if ($recipe->front_image) {
                    Storage::disk('public')->delete($recipe->front_image);
                }
                $validated['front_image'] = $request->file('front_image')
                    ->store('recipes', 'public');

                //  // Supprimer l’ancienne si existe
                // if ($recipe->front_image && Storage::disk('public')->exists($recipe->front_image)) {
                //     Storage::disk('public')->delete($recipe->front_image);
                // }

                // $path = $request->file('front_image')->store('recipes', 'public');
                // $recipe->front_image = $path;
            }

            $recipe->update($validated);

            $recipe->categories()->sync($validated['categories']);

            // Sync pivot ingredients
            $pivotData = [];
            foreach ($validated['ingredients'] as $item) {

                // Création nouvelle section si demandée
                if (($item['section_id'] ?? null) === "new" && !empty($item['newSection'])) {
                    $section = SectionIngredient::create([
                        'nom_section' => $item['newSection'],
                    ]);
                    $item['section_id'] = $section->id;
                }

                // Création nouvel ingrédient si demandé
                if (($item['id'] ?? null) === "new" && !empty($item['newIngredient'])) {
                    $ingredient = Ingredient::create([
                        'name' => $item['newIngredient'],
                    ]);
                    $item['id'] = $ingredient->id;
                }

                if (!empty($item['id'])) {
                    $pivotData[$item['id']] = [
                        'quantity'  => $item['quantity'] ?? null,
                        'is_optional' => isset($item['is_optional']) ? (bool)$item['is_optional'] : false,
                        'section_ingredient_id' => $item['section_id'] ?? null,
                    ];
                }
            }
            // Sync final avec pivot propre
            $recipe->ingredients()->sync($pivotData);

            // Directions : remove old + images
            foreach ($recipe->directions as $dir) {
                if ($dir->direction_image) {
                    Storage::disk('public')->delete($dir->direction_image);
                }
            }
            $recipe->directions()->delete();

            foreach ($request->directions as $index => $dir) {
                $imagePath = null;
                if (!empty($dir['direction_image'])) {
                    $imagePath = $dir['direction_image']->store('directions', 'public');
                }

                $recipe->directions()->create([
                    'step_number' => $index + 1,
                    'step_title' => $dir['step_title'],
                    'instruction' => $dir['instruction'],
                    'direction_image' => $imagePath
                ]);
            }

            // Nutrition
            $recipe->nutrition()->updateOrCreate([], $validated['nutrition'] ?? []);
        });

        return redirect()->route('admin.recipes.index')
            ->with('success', 'Recette mise à jour avec succès !');
    }

    /**
     * Destroy recipe + detach relations + delete images
     */
    public function destroy(Recipe $recipe)
    {
        DB::transaction(function () use ($recipe) {

            if ($recipe->front_image) {
                Storage::disk('public')->delete($recipe->front_image);
            }

            foreach ($recipe->directions as $dir) {
                if ($dir->direction_image) {
                    Storage::disk('public')->delete($dir->direction_image);
                }
            }

            $recipe->categories()->detach();
            $recipe->ingredients()->detach();

            $recipe->directions()->delete();
            $recipe->nutrition()->delete();
            $recipe->delete();
        });

        return redirect()->back()->with('success', 'Recette supprimée avec succès.');
    }


    /**
     * Shared validation rules
     */
    private function validateRecipe(Request $request): array
    {
        // dd($request);
        return $request->validate([

            // Champs principaux
            'title'        => ['required', 'string', 'max:255'],
            'description'  => ['nullable', 'string'],
            'prep_time'    => ['nullable', 'integer', 'min:0'],
            'cook_time'    => ['required', 'integer', 'min:1'],
            'status'       => ['required', ],

            // Image principale
            'front_image'  => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:4096'],

            // Catégories
            'categories'   => ['required', 'array', 'min:1'],
            'categories.*' => ['integer', 'exists:categories,id'],

            // Ingrédients
            'ingredients'               => ['required', 'array', 'min:1'],

            'ingredients.*.id'          => ['nullable', 'integer', 'exists:ingredients,id'],
            'ingredients.*.newIngredient' => [
                'nullable', 'string', 'max:255',
                'required_without:ingredients.*.id'
            ],

            'ingredients.*.quantity'    => ['nullable', 'string', 'max:100'],

            // Section
            'ingredients.*.section_id'  => ['nullable', 'integer', 'exists:section_ingredients,id'],
            'ingredients.*.newSection'  => [
                'nullable', 'string', 'max:255',
                'required_without:ingredients.*.section_id'
            ],

            // Optionnel
            'ingredients.*.is_optional' => ['nullable', 'boolean'],

            // Directions / étapes
            'directions'                 => ['required', 'array', 'min:1'],
            'directions.*.step_title'    => ['required', 'string', 'max:255'],
            'directions.*.instruction'   => ['required', 'string'],
            'directions.*.direction_image' => [
                'nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:4096'
            ],

            // Nutrition
            'nutrition' => ['nullable', 'array'],

        ], [

            // Messages d’erreurs personnalisés FR
            'title.required' => 'Le titre est obligatoire.',
            'prep_time.min'  => 'Le temps de préparation doit être au minimum 1 minute ou 0.',
            'cook_time.min'  => 'Le temps de cuisson doit être au minimum 1 minute.',
            'cook_time.required'  => 'Le temps de cuisson est obligatoire.',
            'categories.required' => 'Sélectionnez au moins une catégorie.',

            'ingredients.required' => 'Ajoutez au moins un ingrédient.',
            'ingredients.*.id.exists' => "Cet ingrédient n'existe pas.",
            'ingredients.*.newIngredient.required_without' =>
                "Veuillez sélectionner ou saisir un ingrédient.",

            'ingredients.*.section_id.exists' =>
                "La section sélectionnée n'existe pas.",
            'ingredients.*.newSection.required_without' =>
                "Veuillez sélectionner ou saisir une section pour cet ingrédient.",

            'directions.required' => 'Ajoutez au moins une étape.',
            'directions.*.step_title.required' => 'Un titre est requis pour chaque étape.',
            'directions.*.instruction.required' => 'Une instruction est requise pour chaque étape.',

            'front_image.mimes' => "Le format de l'image est invalide.",
            'front_image.max'   => "L'image ne doit pas dépasser 4 MB.",
        ]);
    }
}

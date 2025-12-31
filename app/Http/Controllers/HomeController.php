<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Home page with featured recipes.
     */
    public function index(Request $request)
    {
        // Catégories pour les filtres
        $categories = Category::select('id', 'name', 'alias', 'category_image', 'dominant_color')->get();

        $category_id = $request->get('category_id');
        // Trouver l'alias de la catégorie sélectionnée (si existe)
        $categoryAlias = $category_id
            ? Category::where('id', $category_id)->value('name') // 'alias'
            : null;

        // Si filtre actif → recettes de cette catégorie
        $query = Recipe::with('author', 'categories')->latest();

        if ($request->filled('category_id')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('categories.id', $request->category_id);
            });
        }

        $recipes = $query->latest()->paginate(9);

        // Pour OtherRecipes → 3 du même type si filtre, sinon random
        $otherRecipes = Recipe::with('categories')
            ->when($categoryAlias, function ($query, $alias) {
                $query->whereHas('categories', function($q) use ($alias) {
                    $q->where('alias', $alias);
                });
            })
            ->inRandomOrder()
            ->take(3)
            ->get();

        // Si < 3 → compléter avec autres recettes
        if ($otherRecipes->count() < 3) {
            $extra = Recipe::whereNotIn('id', $otherRecipes->pluck('id'))
                ->inRandomOrder()
                ->take(3 - $otherRecipes->count())
                ->get();
            $otherRecipes = $otherRecipes->merge($extra);
        }

        return Inertia::render('Front/Home', [
            'categories' => $categories,
            'selectedCategory' => $categoryAlias, // null si "Toutes"
            'recipes' => $recipes,
            'otherRecipes' => $otherRecipes,
        ]);
    }

    /**
     * Recipe details page (public).
     */
    public function show(Recipe $recipe)
    {
        $recipe->load([
            'author',
            'categories',
            'directions' => fn($q) => $q->orderBy('step_number'),
            'nutrition',
        ]);

        $sections = $recipe->sections()
            ->with(['ingredientsForRecipe' => fn($q) => $q->where('recipe_id', $recipe->id)->with('ingredient')])
            ->get()
            ->each(function($section){
                $section->ingredients_for_recipe = $section->ingredientsForRecipe;
            });

        return Inertia::render('Front/RecipeDetails', [
            'recipe' => $recipe,
            'recipeFormatted' => $sections,
            'otherRecipes' => Recipe::where('id', '!=', $recipe->id)->inRandomOrder()->take(3)->get(),
        ]);
    }
}

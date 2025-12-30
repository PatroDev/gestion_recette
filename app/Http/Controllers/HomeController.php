<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Home page with featured recipes.
     */
    public function index()
    {
        return Inertia::render('Front/Home', [
            'featured' => Recipe::inRandomOrder()->take(3)->get(),
            'recipes' => Recipe::latest()->take(9)->get(),
        ]);
    }

    /**
     * Recipe details page (public).
     */
    public function show(Recipe $recipe)
    {
        // $sections = $recipe->sections()->get()->map(function ($section) use ($recipe) {
        //     $section->ingredients_for_recipe = $section->ingredientsForRecipeQuery($recipe->id)->get();
        //     return $section;
        // });

        $sections = $recipe->sections()->with(['ingredientsForRecipe' => fn($q) => $q->where('recipe_id', $recipe->id)])->get();

        return Inertia::render('Front/RecipeDetails', [
            'recipe' => $recipe,
            'recipeFormatted' => $sections,
            'otherRecipes' => Recipe::where('id', '!=', $recipe->id)->inRandomOrder()->take(3)->get(),
        ]);
    }
}

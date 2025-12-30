<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SectionIngredient extends Model
{
    protected $fillable = ['nom_section'];

    public function recipeIngredients()
    {
        return $this->hasMany(RecipeIngredient::class);
    }

    public function ingredientsForRecipe()
    {
        return $this->hasMany(RecipeIngredient::class, 'section_ingredient_id')->with('ingredient');
    }

    // Helper pour filtrer par recette
    public function ingredientsForRecipeQuery($recipeId)
    {
        return $this->recipeIngredients()
                    ->where('recipe_id', $recipeId)
                    ->with('ingredient');
    }

    public function ingredients()
    {
        return $this->hasManyThrough(
            Ingredient::class,
            RecipeIngredient::class,
            'section_ingredient_id', // Foreign key on recipe_ingredients
            'id', // Foreign key on ingredients
            'id', // Local key on section_ingredients
            'ingredient_id' // Second local key on recipe_ingredients
        );
    }
}

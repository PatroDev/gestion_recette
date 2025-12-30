<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RecipeIngredient extends Pivot
{
    protected $table = 'recipe_ingredients';
    protected $fillable = ['recipe_id', 'ingredient_id', 'section_ingredient_id' , 'quantity', 'is_optional'];

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class);
    }

    public function section()
    {
        return $this->belongsTo(SectionIngredient::class, 'section_ingredient_id');
    }
}

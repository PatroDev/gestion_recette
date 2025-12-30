<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    protected $fillable = ['name', 'ingredient_image',];

    public function recipes() {
        return $this->belongsToMany(Recipe::class, 'recipe_ingredients')
                ->withPivot('section_ingredient_id', 'quantity', 'is_optional')
                ->withTimestamps();
    }
}

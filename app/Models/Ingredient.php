<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Ingredient extends Model
{
    protected $fillable = ['name', 'ingredient_image',];

    public function recipes() {
        return $this->belongsToMany(Recipe::class, 'recipe_ingredients')
                ->withPivot('section_ingredient_id', 'quantity', 'is_optional')
                ->withTimestamps();
    }

    /**
     * Summary of appends
     * @var array
     */
    protected $appends = ['ingredient_image_url'];

    public function getIngredientImageUrlAttribute()
    {
        return $this->ingredient_image
            ? Storage::url($this->ingredient_image)
            : asset('images/ingredient-default.png');
    }
}

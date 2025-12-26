<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nutrition extends Model
{
    protected $fillable = [
        'recipe_id','calories','total_fat','protein','carbohydrate','cholesterol'
    ];

    public function recipe() {
        return $this->belongsTo(Recipe::class);
    }
}

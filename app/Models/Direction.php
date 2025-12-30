<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Direction extends Model
{
    protected $fillable = ['recipe_id', 'step_title', 'step_number', 'instruction', 'direction_image'];

    public function recipe() {
        return $this->belongsTo(Recipe::class);
    }
}

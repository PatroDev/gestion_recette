<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Direction extends Model
{
    protected $fillable = ['recipe_id','step_number','instruction'];

    public function recipe() {
        return $this->belongsTo(Recipe::class);
    }
}

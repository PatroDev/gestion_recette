<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Direction extends Model
{
    protected $fillable = ['recipe_id', 'step_title', 'step_number', 'instruction', 'direction_image'];

    public function recipe() {
        return $this->belongsTo(Recipe::class);
    }

    /**
     * Summary of appends
     * @var array
     */
    protected $appends = ['direction_image_url'];

    public function getDirectionImageUrlAttribute()
    {
        return $this->direction_image
            ? Storage::url($this->direction_image)
            : null;
    }

}

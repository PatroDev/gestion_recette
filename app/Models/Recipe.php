<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Recipe extends Model
{
    protected $fillable = [
        'title', 'alias', 'author_id', 'description', 'prep_time', 'cook_time', 'status', 'front_image',
    ];

    public function author() {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function categories() {
        return $this->belongsToMany(Category::class, 'recipe_categories');
    }

    public function ingredients() {
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredients')
                    ->withPivot('quantity', 'section');
    }

    public function directions() {
        return $this->hasMany(Direction::class);
    }

    public function nutrition() {
        return $this->hasOne(Nutrition::class);
    }

    /**
     * Summary of boot
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        // Avant validate + save
        static::saving(function ($model) {

            // Si alias vide → slug automatique
            if (empty($model->alias) && !empty($model->title)) {
                $model->alias = Str::slug($model->title);
            }

            // Si update : détecter changement de nom
            if ($model->exists) {
                $originalName = $model->getOriginal('title');
                $originalAlias = $model->getOriginal('alias');

                // Si alias n’a pas été modifié manuellement MAIS le nom a changé → régénérer
                if ($model->title !== $originalName && $model->alias === $originalAlias) {
                    $model->alias = Str::slug($model->title);
                }
            }
        });

        // Gestion unicité alias
        static::saving(function ($model) {
            $original = $model->alias;
            $alias = $original;
            $i = 1;
            // Exclure l'ID courant lors d'un update
            while (
                self::where('alias', $alias)
                    ->when($model->exists, fn ($q) => $q->where('id', '!=', $model->id))
                    ->exists()
            ) {
                $alias = $original . '-' . $i++;
            }
            $model->alias = $alias;
        });
    }

    // Utiliser alias pour le binding des routes
    public function getRouteKeyName()
    {
        return 'alias';
    }
}

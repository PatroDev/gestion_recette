<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    protected $fillable = ['name','alias','image'];

    public function recipes() {
        return $this->belongsToMany(Recipe::class, 'recipe_categories');
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
            if (empty($model->alias) && !empty($model->name)) {
                $model->alias = Str::slug($model->name);
            }

            // Si update : détecter changement de nom
            if ($model->exists) {
                $originalName = $model->getOriginal('name');
                $originalAlias = $model->getOriginal('alias');

                // Si alias n’a pas été modifié manuellement MAIS le nom a changé → régénérer
                if ($model->name !== $originalName && $model->alias === $originalAlias) {
                    $model->alias = Str::slug($model->name);
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

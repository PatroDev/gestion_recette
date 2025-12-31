<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Category;
use ColorThief\ColorThief;

class ComputeCategoryColors extends Command
{
    protected $signature = 'categories:compute-colors'; // php artisan categories:compute-colors
    protected $description = 'Extract dominant color from category images';

    public function handle()
    {
        $this->info("Processing categories...");

        Category::all()->each(function ($cat) {
            $path = storage_path("app/public/{$cat->category_image}");

            if (!file_exists($path)) {
                $this->warn("Image not found for category {$cat->id}");
                return;
            }

            try {
                $rgb = ColorThief::getColor($path);
                $hex = sprintf("#%02x%02x%02x", $rgb[0], $rgb[1], $rgb[2]);
                $cat->dominant_color = $hex;
                $cat->save();

                $this->info("Updated: {$cat->name} → {$hex}");
            } catch (\Exception $e) {
                $this->error("Failed: {$cat->name} ({$e->getMessage()})");
            }
        });

        $this->info("✔ Done!");
    }
}

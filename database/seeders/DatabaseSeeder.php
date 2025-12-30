<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Ingredient;
use App\Models\SectionIngredient;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // --- Users ---
        User::firstOrCreate(
            ['email' => 'patrodev@gmail.com'],
            [
                'first_name' => 'Patro',
                'last_name' => 'Dev',
                'password' => Hash::make('1234567890'),
                'role' => 'admin',
            ]
        );

        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'first_name' => 'Admin',
                'last_name' => 'User',
                'password' => Hash::make('1234567890'),
                'role' => 'admin',
            ]
        );

        User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'first_name' => 'Regular',
                'last_name' => 'User',
                'password' => Hash::make('1234567890'),
                'role' => 'user',
            ]
        );

        // --- Categories ---
        $categories = ['Breakfast', 'Vegan', 'Meat', 'Dessert', 'Lunch', 'Chocolate'];
        foreach ($categories as $categoryName) {
            Category::firstOrCreate(['name' => $categoryName]);
        }

        // --- Sections d'ingrédients ---
        $sections = [
            'Main Dish',
            'Sauce',
            'Garnish',
            'Spices',
            'Toppings',
        ];

        foreach ($sections as $sectionName) {
            SectionIngredient::firstOrCreate(['nom_section' => $sectionName]);
        }

        // --- Ingredients (sans section_id désormais) ---
        $ingredients = [
            ['name' => 'Eggs', 'ingredient_image' => 'eggs.jpg'],
            ['name' => 'Milk', 'ingredient_image' => 'milk.jpg'],
            ['name' => 'Flour', 'ingredient_image' => 'flour.jpg'],
            ['name' => 'Sugar', 'ingredient_image' => 'sugar.jpg'],
            ['name' => 'Butter', 'ingredient_image' => 'butter.jpg'],
            ['name' => 'Chicken', 'ingredient_image' => 'chicken.jpg'],
            ['name' => 'Chocolate', 'ingredient_image' => 'chocolate.jpg'],
            ['name' => 'Rice', 'ingredient_image' => 'rice.jpg'],
            ['name' => 'Tomatoes', 'ingredient_image' => 'tomatoes.jpg'],
        ];

        foreach ($ingredients as $ingredientData) {
            Ingredient::firstOrCreate(['name' => $ingredientData['name']], $ingredientData);
        }
    }
}



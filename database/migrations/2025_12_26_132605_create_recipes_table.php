<?php

// database/migrations/xxxx_create_recipes_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('alias')->nullable()->unique();
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->text('description')->nullable();
            $table->integer('prep_time')->nullable();
            $table->integer('cook_time')->nullable();
            // $table->integer('servings')->default(1);
            // $table->string('difficulty')->nullable(); // ['Easy', 'Medium', 'Hard']
            $table->boolean('status')->default(true); // is_featured
            $table->string('front_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};

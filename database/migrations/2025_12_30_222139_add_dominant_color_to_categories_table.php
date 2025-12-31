<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_add_dominant_color_to_categories_table.php
    public function up()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('dominant_color', 10)->nullable()->after('category_image');
        });
    }

    public function down()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('dominant_color');
        });
    }
};

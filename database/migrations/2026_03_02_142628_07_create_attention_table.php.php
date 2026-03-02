<?php

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
         Schema::create('attention', function (Blueprint $table) {
            // Asegúrate de que sea unsignedInteger
            $table->unsignedInteger('id_attention')->autoIncrement();
            $table->string('clap', 50);
            $table->string('family', 50);
            $table->string('proteicos', 50);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('attention');
    }
};

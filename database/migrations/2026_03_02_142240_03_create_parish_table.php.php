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
        Schema::create('parish', function (Blueprint $table) {
            $table->unsignedInteger('id_parish')->autoIncrement();
            $table->string('parish', 100);
            
            // ESTA ES LA LÍNEA CLAVE: Debe ser unsignedInteger
            $table->unsignedInteger('id_municipality'); 

            // Definición de la llave foránea
            $table->foreign('id_municipality')->references('id_municipality')->on('municipality');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parish');
    }
};

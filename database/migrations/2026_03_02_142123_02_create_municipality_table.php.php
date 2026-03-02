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
        Schema::create('municipality', function (Blueprint $table) {
                // Debe ser unsignedInteger y autoIncrement
                $table->unsignedInteger('id_municipality')->autoIncrement(); 
                $table->string('municipality', 100);
                $table->unsignedInteger('id_states');
                $table->foreign('id_states')->references('id_states')->on('states');
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('municipality');
    }
};

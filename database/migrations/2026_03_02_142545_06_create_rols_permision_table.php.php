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
        Schema::create('rols_permision', function (Blueprint $table) {
            $table->unsignedInteger('id_rolspermision')->autoIncrement();
            
            // ESTAS DOS DEBEN SER unsignedInteger
            $table->unsignedInteger('id_rols');
            $table->unsignedInteger('id_permision');

            // Relaciones
            $table->foreign('id_rols')->references('id_rols')->on('rols')
                ->onDelete('cascade')->onUpdate('cascade');
                
            $table->foreign('id_permision')->references('id_permision')->on('permision')
                ->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rols_permision');
    }
};

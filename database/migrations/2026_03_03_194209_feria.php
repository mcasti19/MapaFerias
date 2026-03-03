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
        Schema::create('feria', function (Blueprint $table) {
            $table->id("id_feria");
            $table->bigInteger('id_state')->unsigned();
            $table->bigInteger('id_municipality')->unsigned();
            $table->bigInteger('id_parish')->unsigned();
            $table->string('sector');
            $table->string('mission_base');
            $table->string('clap');
            $table->string('circuit');
            $table->string('coordinates');
            $table->string('full_name', 100);
            $table->string('cedula', 20);
            $table->string('phone', 20);
            $table->string('compliance');
            $table->string('observations');
        
            $table->foreign('id_state')->references('id_state')->on('state');
            $table->foreign('id_municipality')->references('id_municipality')->on('municipalities');
            $table->foreign('id_parish')->references('id_parish')->on('parishes');
            

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feria');
    }
};

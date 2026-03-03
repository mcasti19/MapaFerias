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
        Schema::create('municipalities_analitic', function (Blueprint $table) {
            $table->id('id_municipalities');
            $table->text('municipalities');
            $table->bigInteger('id_states')->unsigned();
            $table->timestamps();

            $table->foreign('id_states')->references('id_states')->on('states_analitic')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('municipalities');
    }
};

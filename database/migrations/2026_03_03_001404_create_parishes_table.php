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
        Schema::create('parishes_analitic', function (Blueprint $table) {
            $table->id('id_parishes');
            $table->text('parishes');
            $table->bigInteger('id_municipalities')->unsigned();
            $table->timestamps();

            $table->foreign('id_municipalities')->references('id_municipalities')->on('municipalities_analitic')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parishes');
    }
};

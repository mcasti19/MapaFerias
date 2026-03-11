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
        Schema::create('deployment', function (Blueprint $table) {
            $table->id('id_deployment');
            $table->string('month');
            $table->string('start_deployment');
            $table->string('end_deployment');

            $table->bigInteger('id_feria')->unsigned();
            $table->foreign('id_feria')->references('id_feria')->on('feria')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deployment');
    }
};

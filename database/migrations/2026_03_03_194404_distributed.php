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
        Schema::create('distributed', function (Blueprint $table) {
            $table->id("id_distributed");
            $table->bigInteger('id_item')->unsigned();
            $table->bigInteger('id_feria')->unsigned();
            $table->string('tons');

            $table->foreign('id_item')->references('id_item')->on('items');
            $table->foreign('id_feria')->references('id_feria')->on('feria');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

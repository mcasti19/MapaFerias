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
        Schema::create('items_marketeds', function (Blueprint $table) {
            $table->id('id_items_marketeds');
            $table->string('item', 50);
            $table->string('tons', 50);
            $table->date('date_attention');
            $table->bigInteger('id_users')->unsigned();
            $table->timestamps();

            $table->foreign('id_users')->references('id_users')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items_marketeds');
    }
};

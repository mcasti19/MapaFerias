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
        Schema::create('rubros_entrega', function (Blueprint $table) {
            $table->unsignedInteger('id_users'); 
           
            $table->string('item', 50);
            $table->string('tons', 50);
            $table->timestamp('fecha_entrega')->useCurrent();

            $table->foreign('id_users')->references('id_users')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_table_');
    }
};

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
        Schema::create('states', function (Blueprint $table) {
            // Usar unsignedInteger asegura compatibilidad con int(11) de MariaDB
            $table->unsignedInteger('id_states')->autoIncrement(); 
            $table->string('states', 100);
     });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('states');
    }
};

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
        Schema::create('users', function (Blueprint $table) {
        $table->unsignedInteger('id_users')->autoIncrement()->primary();
        $table->string('email', 100)->unique();
        $table->string('password');
        $table->rememberToken();
        
        $table->unsignedInteger('id_rols'); // Única FK que quedó en esta tabla
        $table->timestamps();

        // DEFINICIÓN DE CONSTRAINTS
        $table->foreign('id_rols')->references('id_rols')->on('rols');
    });

    Schema::create('responsable', function (Blueprint $table) {
        $table->unsignedInteger('id_responsable')->autoIncrement()->primary();
        $table->string('full_name', 50);
        $table->string('cedula', 10);
        $table->string('phone', 20);
        
        $table->unsignedInteger('id_parish');
        $table->unsignedInteger('id_attention');
        $table->unsignedInteger('circuit'); 
        $table->string('coordenadas'); 

        $table->string('mission_base', 150);
        $table->string('clap', 200);
        $table->string('tons', 50);
        $table->string('compliance', 50);
        $table->date('date');
        $table->string('observations', 200);
        $table->timestamps();

        // DEFINICIÓN DE CONSTRAINTS
        $table->foreign('id_parish')->references('id_parish')->on('parish');
        $table->foreign('id_attention')->references('id_attention')->on('attention')
            ->onDelete('cascade')->onUpdate('cascade');
            
        $table->foreign('circuit')
            ->references('id_circuit')
            ->on('circuit_or_communes')
            ->onDelete('cascade')
            ->onUpdate('cascade');
    });
        

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};

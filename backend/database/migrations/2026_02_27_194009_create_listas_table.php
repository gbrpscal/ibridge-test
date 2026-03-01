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
        Schema::create('listas', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary();
            $table->string('nome');

            $table->unsignedBigInteger('campanha_id');
            $table->foreign('campanha_id')->references('id')->on('campanhas');

            $table->timestamps();

            $table->index('campanha_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listas');
    }
};

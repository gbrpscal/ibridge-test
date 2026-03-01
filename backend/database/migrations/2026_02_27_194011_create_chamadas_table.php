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
        Schema::create('chamadas', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary();

            $table->dateTime('datahora')->index();

            $table->unsignedBigInteger('contato_id');
            $table->unsignedBigInteger('lista_id');
            $table->unsignedBigInteger('campanha_id');
            $table->unsignedBigInteger('operador_id');
            $table->unsignedBigInteger('situacao_id');
            $table->unsignedBigInteger('categoria_id');

            $table->foreign('contato_id')->references('id')->on('contatos');
            $table->foreign('lista_id')->references('id')->on('listas');
            $table->foreign('campanha_id')->references('id')->on('campanhas');
            $table->foreign('operador_id')->references('id')->on('operadores');
            $table->foreign('situacao_id')->references('id')->on('situacoes');
            $table->foreign('categoria_id')->references('id')->on('categorias');

            $table->timestamps();

            // ⭐ índices para ranking (diferencial)
            $table->index(['situacao_id', 'operador_id']);
            $table->index(['situacao_id', 'lista_id']);
            $table->index(['situacao_id', 'campanha_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chamadas');
    }
};

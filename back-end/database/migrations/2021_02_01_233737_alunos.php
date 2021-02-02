<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Alunos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_alunos', function (Blueprint $table) {
            $table->id();
            $table->string('nome_completo');
            $table->string('email');
            $table->char('sexo', 1);
            $table->integer('idade');
            $table->char('telefone', 12);
            $table->string('turno');
            $table->string('curso');
            $table->char('rg', 12);
            $table->char('cpf', 14);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_alunos');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class User extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Email', 255)->unique();
            $table->string('Nome', 255);
            $table->string('Senha', 100);
        });

        $data = [
            ['Email'=>'master@master.com', 'Nome'=> 'Master', 'Senha' => encrypt('master123')]
        ]; 

        DB::table('tb_user')->insert($data);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_user');
    }
}

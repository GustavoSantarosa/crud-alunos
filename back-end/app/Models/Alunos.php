<?php

namespace App\Models;

use App\Lib\Connection;

class Alunos 
{
    protected $_connectionBase;

    public function __construct() {
        $this->_connectionBase = new Connection();
    }

    public function all() {

        return $this->_connectionBase->executeWithReturnAll
        ("SELECT * FROM tb_alunos
        ORDER BY id"); 
    }

    public function insert($request) {
        $nome_completo = $request['nome_completo'] ?? '';
        $email         = $request['email']         ?? '';
        $sexo          = $request['genero']          ?? '';

        $sql = "INSERT INTO tb_alunos
                                (nome_completo, email, genero)
                                VALUES
                                ('".$nome_completo ."',
                                 '".$email ."',
                                 '".$genero ."',
                                ) RETURNING id;";
        try {
            $ret = $this->_connectionBase->executeWithReturnRow($sql);
        } catch (Exception $ex) {
            $this->_connectionBase->rollBackTransaction();
        }

        return true;
    }

    public function update($request, $id) {

        $sql = "UPDATE tb_alunos SET
                                nome_completo = '".$request['nome_completo'] ."',
                                email         = '".$request['email'] ."',
                                genero        = '".$request['genero'] ."',
                                WHERE id = $id;";
        try {
            $ret = $this->_connectionBase->executeWithReturnRow($sql);
        } catch (Exception $ex) {
            $this->_connectionBase->rollBackTransaction();
        }

        return true;
    }

    public function delete($id) {
        return $this->_connectionBase->executeWithReturnAll
        ("DELETE FROM tb_alunos WHERE id = $id "); 
    }
}

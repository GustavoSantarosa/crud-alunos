<?php

namespace App\Models;

use App\Lib\Connection;

class Alunos 
{
    protected $_connectionBase;

    public function __construct() {
        $this->_connectionBase = new Connection();
    }

    public function all($id = '') {

		if($id != '') {
			$where = "id = " .$id;
        } 
        else {
			$where = "1=1";
		}
		
        return $this->_connectionBase->executeWithReturnAll
        ("SELECT * FROM tb_alunos
		WHERE $where
        ORDER BY id"); 
    }

    public function insert($request) {
        $nome_completo = $request['nome_completo'] ?? '';
        $email         = $request['email']         ?? '';
        $sexo          = $request['sexo']          ?? '';
        $idade         = $request['idade']         ?? '';
        $telefone      = $request['telefone']      ?? '';
        $turno         = $request['turno']         ?? '';
        $curso         = $request['curso']         ?? '';
        $rg            = $request['rg']            ?? '';
        $cpf           = $request['cpf']           ?? '';

        $sql = "INSERT INTO tb_alunos
                                (nome_completo, email, sexo, idade, telefone, turno, curso, rg, cpf)
                                VALUES
                                ('".$nome_completo ."',
                                 '".$email ."',
                                 '".$sexo ."',
                                 '".$idade ."',
                                 '".$telefone ."',
                                 '".$turno ."',
                                 '".$curso ."',
                                 '".$rg ."',
                                 '".$cpf ."'
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
                                sexo          = '".$request['sexo'] ."',
                                idade         = '".$request['idade'] ."',
                                telefone      = '".$request['telefone'] ."',
                                turno         = '".$request['turno'] ."',
                                curso         = '".$request['curso'] ."',
                                rg            = '".$request['rg'] ."',
                                cpf           = '".$request['cpf'] ."'
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

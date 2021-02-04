<?php

namespace App\Models;
use Tymon\JWTAuth\Contracts\JWTSubject;

use App\Lib\Connection;

class User 
{
    protected $_connectionBase;

    public function __construct() {
        $this->_connectionBase = new Connection();
    }

    public function getUser($id) {

        return $this->_connectionBase->executeWithReturnAll
        ("SELECT * FROM tb_user
		WHERE id = $id"); 
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

}

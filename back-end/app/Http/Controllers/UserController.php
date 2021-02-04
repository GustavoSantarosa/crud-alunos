<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lib\DataPrepare;
use App\Lib\ErrorCodes;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $User    = new User();
        $allUser = $User->all();

        if(!$allUser){
            return response()->json(
                dataPrepare::successMessage(
                   'Houve algum erro ao carregar o usuário!, por favor verifique a conexão',
                   ErrorCodes::COD_ERROR_NOT_IDENTIFIED ,
               )
           ,404);  
        }

        return response()->json([            
            'alunos' =>$allUser]);

    }
}

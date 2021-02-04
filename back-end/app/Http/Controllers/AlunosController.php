<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lib\DataPrepare;
use App\Lib\ErrorCodes;
use App\Models\Alunos;

class AlunosController extends Controller
{
    public function index()
    {
        $Alunos    = new Alunos();
        $allAlunos = $Alunos->all();

        if(!$allAlunos){
            return response()->json(
                dataPrepare::successMessage(
                   'Houve algum erro ao carregar os Alunos!, por favor verifique a conexão',
                   ErrorCodes::COD_ERROR_NOT_IDENTIFIED ,
               )
           ,404);  
        }

        return response()->json([            
            'alunos' =>$allAlunos]);

    }
	

    public function store(Request $request) 
    {
        $Alunos    = new Alunos();
        $ret       = $Alunos->insert($request);

        
        if(!$ret){
            return response()->json(
                dataPrepare::successMessage(
                   'Houve algum erro ao inserir o aluno!',
                   ErrorCodes::COD_ERROR_NOT_IDENTIFIED ,
               )
           ,404);  
        }

        return response()->json(
             dataPrepare::successMessage(
                'Aluno inserido com sucesso!',
                ErrorCodes::COD_SUBMITTED_SUCCESSFULLY ,
            )
        ,200);  
    }

    public function update(Request $request, $id) 
    {
        $Alunos    = new Alunos();
        $ret       = $Alunos->update($request, $id);

        if(!$ret){
            return response()->json(
                dataPrepare::successMessage(
                   'Houve algum erro ao editar o aluno!',
                   ErrorCodes::COD_ERROR_NOT_IDENTIFIED ,
               )
           ,404);  
        }

        return response()->json(
             dataPrepare::successMessage(
                'Aluno alterado com sucesso!',
                ErrorCodes::COD_SUBMITTED_SUCCESSFULLY ,
            )
        ,200);  
    }

    public function destroy(Request $request, $id) 
    {
        $Alunos    = new Alunos();
        $ret       = $Alunos->delete($id);

        if(!$ret){
            return response()->json(
                dataPrepare::successMessage(
                   'Houve algum erro ao deletar o aluno!',
                   ErrorCodes::COD_ERROR_NOT_IDENTIFIED ,
               )
           ,404);  
        }

        return response()->json(
             dataPrepare::successMessage(
                'Aluno deletado com sucesso!',
                ErrorCodes::COD_SUBMITTED_SUCCESSFULLY ,
            )
        ,200);  
    }
}

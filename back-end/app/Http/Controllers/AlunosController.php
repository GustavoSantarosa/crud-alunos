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

        return response()->json([            
            'alunos' =>$allAlunos]);

    }
	
	public function getId($id)
    {
        $Alunos    = new Alunos();
        $allAlunos = $Alunos->all($id);

        return response()->json([            
            'alunos' =>$allAlunos]);

    }

    public function store(Request $request) 
    {
        $Alunos    = new Alunos();
        $ret       = $Alunos->insert($request);

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

        return response()->json(
             dataPrepare::successMessage(
                'Aluno deletado com sucesso!',
                ErrorCodes::COD_SUBMITTED_SUCCESSFULLY ,
            )
        ,200);  
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Models\Aluno;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AlunoController extends Controller
{
    private $aluno;

    public function __construct(Aluno $aluno){
        $this->aluno = $aluno;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json($this->aluno->all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $alunoData = $request->all();
            $this->aluno->create($alunoData);

            $return = [
                "data"=> [
                    "msg" => "O Aluno com o nome {$request->name} foi criada com sucesso!"
                ]
            ];

            return response()->json($return, 201);

        } catch(\Exception $e){
            if(config('app.debug')){
                return response()->json($e->getMessage(), 500);
            }
            return response()->json('Houve um erro ao realizar a operação de salvar', 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Aluno  $aluno
     * @return \Illuminate\Http\Response
     */

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Aluno  $aluno
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{
            $alunoData    = $request->all();
            $aluno        = $this->aluno->find($id);

            $aluno->update($alunoData);

            $return = [
                'data'=> [
                    'msg' => 'Aluno alterado com sucesso!'
                ]
            ];

            return response()->json($return, 201);
        } catch(\Exception $e){
            if(config('app.debug')){
                return response()->json($e->getMessage(), 500);
            }

            return response()->json('Houve um erro ao realizar a operação de atualizar', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Aluno  $aluno
     * @return \Illuminate\Http\Response
     */
    public function destroy(Aluno $id)
    {
        try{
            $id->delete();

            return response()->json([
                'data' => [
                    'msg' => 'Aluno: '.$id->name.' removido com sucesso!'
                ]
            ],200);
        }catch(\Exception $e){
            if(config('app.debug')){
                return response()->json($e->getMessage(), 500);
            }

            return response()->json('Houve um erro ao realizar a operação de remover', 500);
        }
    }
}
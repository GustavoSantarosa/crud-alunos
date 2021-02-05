<?php
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AlunoController;


Route::group(['prefix' => 'public'] , function () use ($routes){
    Route::group(['prefix' => 'login'], function() {
            Route::post('/',      [AuthController::class, 'login'])     ->name('auth');
        });
});

Route::prefix('pessoas')->middleware('apiJwt')->group(function () {
    Route::prefix('v1/aluno')->group(function () {
        Route::get('/',          [AlunoController::class, 'index'])     ->name('allAlunos');
        Route::post('/',         [AlunoController::class, 'store'])     ->name('storeAluno');
        Route::put('/{id}',      [AlunoController::class, 'update'])    ->name('updateAluno');
        Route::delete('/{id}',   [AlunoController::class, 'destroy'])   ->name('deleteAluno');
    });
});

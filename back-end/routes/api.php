<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'public'] , function () use ($routes){
    Route::group(['prefix' => 'alunos'], function() {
            Route::get('/',                             'AlunosController@index');
			Route::get('/{id}',                         'AlunosController@getId');
            Route::post('/store',                       'AlunosController@store');
            Route::put('/update/{id}',                  'AlunosController@update');
            Route::delete('/delete/{id}',               'AlunosController@destroy');
        });
});

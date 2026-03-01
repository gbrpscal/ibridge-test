<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    Route::get('/resumo', [DashboardController::class, 'resumo']);
    Route::get('/top-operadores', [DashboardController::class, 'topOperadores']);
    Route::get('/top-listas', [DashboardController::class, 'topListas']);
    Route::get('/top-campanhas', [DashboardController::class, 'topCampanhas']);
});

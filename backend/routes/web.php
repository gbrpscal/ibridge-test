<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;

Route::get('/', function () {
    $path = public_path('app/index.html');
    abort_unless(file_exists($path), 404, 'Frontend build not found');
    return response()->file($path);
});

Route::get('/{any}', function () {
    $path = public_path('app/index.html');
    abort_unless(file_exists($path), 404, 'Frontend build not found');
    return response()->file($path);
})->where('any', '^(?!api|assets).*$');

Route::prefix('api')->group(function () {
    Route::get('/resumo', [DashboardController::class, 'resumo']);
    Route::get('/top-operadores', [DashboardController::class, 'topOperadores']);
    Route::get('/top-listas', [DashboardController::class, 'topListas']);
    Route::get('/top-campanhas', [DashboardController::class, 'topCampanhas']);
});

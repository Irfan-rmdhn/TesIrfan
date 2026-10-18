<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PageSectionController;
use App\Http\Controllers\SectFIeldsController;
use App\Http\Controllers\TemplateController;
use App\Models\SectFIelds;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('/pages', PageController::class)->middleware('auth:sanctum');

Route::get('/templates', [TemplateController::class, 'index'])->middleware('auth:sanctum');
Route::get('/templates/{slug}', [TemplateController::class, 'show'])->middleware('auth:sanctum');

Route::apiResource('pages/{slug}/sections', PageSectionController::class)->middleware('auth:sanctum');

Route::put('pages/{pageSlug}/sections/{sectionId}/fields',[SectFIeldsController::class,'update'])->middleware('auth:sanctum');

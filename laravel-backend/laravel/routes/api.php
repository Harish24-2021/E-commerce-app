<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ProductController;

/*
|-----------------------------------------------------------------------
| API Routes
|-----------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthenticationController::class, 'register']);

Route::post('/createProduct',[ProductController::class, 'createProduct']);

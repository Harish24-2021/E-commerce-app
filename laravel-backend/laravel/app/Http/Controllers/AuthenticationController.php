<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthenticationController extends Controller
{
    public function register(Request $request)
{
    try {
        $validateData = $request->validate([
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'username' => $validateData['username'],
            'email' => $validateData['email'],
            'password' => Hash::make($validateData['password']),
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'message' => 'User registration failed',
            'errors' => $e->errors()
        ], 422);
    }
}

public function login(Request $request) {

    $request->validate([
        'email' =>'required|email',
        'password' => 'required',
    ]);

    $user= User::where('email', $request->email )->first();

    if($user && Hash::check($request->password,$user->password)){
        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json([
           'message' => 'Logged in successfully',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    } else {
        if(!$user) {
            return response()->json([
                'message' => 'User does  not exist',
             ], 401);
        }
        return response()->json([
            'message' => 'Wrong password'
        ], 401);

    }



    }
}

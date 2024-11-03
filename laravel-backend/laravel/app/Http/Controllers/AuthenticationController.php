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

}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(request $request)
    {
        $val = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);
        $user = User::create($val);
        $token = $user->createToken('token')->plainTextToken;
        $user->remember_token = $token;
        $user->save();
        return response()->json(
            [
                'status' => 'success',
                'message' => 'Registration Successful',
                'data' => $user,
            ],
            201,
        );
    }
    public function login(request $request)
    {
        $val = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
        if (Auth::attempt($val)) {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $user->remember_token = $token;
            $user->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'data' => $user,
            ]);
        }
        return response()->json(
            [
                'status' => 'error',
                'message' => 'Username or password incorrect',
            ],
            401,
        );
    }
    public function logout()
    {
        $user = Auth::user();
        $user->tokens()->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Logout successful',
        ]);
    }
}

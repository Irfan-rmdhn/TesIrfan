<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(web: __DIR__ . '/../routes/web.php', api: __DIR__ . '/../routes/api.php', commands: __DIR__ . '/../routes/console.php', health: '/up')
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid field',
                'errors' => $e->errors(),
            ],422);
        });
        $exceptions->render(function (AuthenticationException $e) {
            return response()->json([
                'status' => 'error',
                 "message"=> "Unauthenticated."
            ],401);
        });
        $exceptions->shouldRenderJsonWhen(fn(Request $request) => $request->is('api/*') || $request->expectsJson());
    })
    ->create();

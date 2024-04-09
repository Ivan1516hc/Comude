<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        try{
            JWTAuth::parseToken()->authenticate();
        }catch(Exception $e){
            if($e instanceof TokenInvalidException){
                return response()->json([
                    'ok'    => false,
                    'status'=>'Token Invalido'
            ],401);
            }
            if($e instanceof TokenExpiredException){
                return response()->json([
                    'ok'    => false,
                    'status'=>'Token Expirado'
                ],401);
            }

            return response()->json([
                'ok'    => false,
                'status'=>'Token no Encontado'
            ],401);
        }
        return $next($request);
    }
}

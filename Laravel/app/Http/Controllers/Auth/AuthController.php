<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Aplicant;
use App\Models\Log;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;
use Illuminate\Mail\Message;
use Carbon\Carbon; // Asegúrate de importar la clase Carbon para trabajar con fechas
use Illuminate\Support\Facades\Mail;


class AuthController extends Controller
{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'curp' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $validator->validated();
        $user = Aplicant::where('curp', $credentials['curp'])->first();

        if (!$user) {
            return response()->json(['message' => 'CURP de usuario y contraseña no coinciden'], 401);
        }

        if (!$user->email_verified_at || $user->email_verified_at->lt(Carbon::now()->subMonths(6))) {
            return response()->json(['message' => 'Correo electrónico no verificado o la verificación expiró'], 400);
        }

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['message' => 'Nombre de usuario y contraseña no coinciden'], 401);
        }

        $this->createNewToken($token);
        $id = $user->id;
        $query = $user->role_id;
        $ok = true;
        $name = $user->name;
        $email = $user->email;

        return response()->json(compact('ok', 'token', 'query', 'id', 'name', 'email'));
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'curp' => 'required|string|size:18',
            'email' => 'string|email|max:100|unique:aplicants',
            'password' => 'required|string|confirmed|min:6',
        ]);

        // Verificar si el correo electrónico ya existe en la base de datos
        $existingUser = Aplicant::where('email', $request->email)->first();
        if ($existingUser) {
            $response['message'] = "El correo electrónico ya está registrado.";
            $response['code'] = 409;
            return response()->json($response);
        }

        if ($request->password != $request->password_confirmation) {
            $response['message'] = "Contraseña y confirmación de contraseña son distintos.";
            $response['code'] = 409;
            return response()->json($response);
        }

        $user = Aplicant::create(array_merge(
            $validator->validated(),
            ['password' => $request->password]
        ));

        $user->verification_token = rand(10000, 99999); // Generar un número aleatorio de 5 dígitos
        $user->save();

        // Obtener el nombre del usuario (si está disponible)
        $curp = $user ? $user->curp : '';
        // Generar la URL de restablecimiento de contraseña con el token
        $number = $user->verification_token;
        $email = $user->email;

        // Enviar el correo electrónico utilizando la vista personalizada
        Mail::send('emails.verify', [
            'curp' => $curp,
            'number' => $number
        ], function (Message $message) use ($email) {
            $message->to($email)
                ->subject('Correo de Verificación');
        });
        // Mail::to($user->email)->send(new VerificationEmail($verificationUrl)); // Enviar correo

        // Log::create([
        //     'user_id' => $user->id, // o null si el usuario no está autenticado
        //     'action' => 'Usuario Registrado',
        //     'description' => 'Usuario registrado con correo ' . $user->email . '.',
        //     'status' => 0,
        //     'read' => 0,
        // ]);

        return response()->json([
            'message' => 'Usuario registrado exitosamente. Por favor verifica tu correo electrónico.',
            'code' => 200
        ], 201);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {
        return response()->json(auth()->user());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 1440,
            'user' => auth()->user()
        ]);
    }

    public function validarToken()
    {
        try {
            JWTAuth::parseToken()->authenticate();
            $type = Auth::user()->role_id;
            return response()->json([
                'ok'    => true,
                'type'  => $type,
                'status' => 'Token Correcto'
            ], 200);
        } catch (Exception $e) {
            if ($e instanceof TokenInvalidException) {
                return response()->json([
                    'ok'    => false,
                    'type'  => 0,
                    'status' => 'Token Invalido'
                ], 401);
            }
            if ($e instanceof TokenExpiredException) {
                return response()->json([
                    'ok'    => false,
                    'type'  => 0,
                    'status' => 'Token Expirado'
                ], 401);
            }

            return response()->json([
                'ok'    => false,
                'type'  => 0,
                'status' => 'Token no Encontrado'
            ], 401);
        }
    }

    public function validateUserVisitor()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }

        if ($user instanceof Aplicant) {
            return response()->json(['ok' => true], 200);
        } else {
            return response()->json(['error' => 'El token no corresponde a un Aplicant'], 401);
        }
    }


    public function validateUserAdmin()
    {
        JWTAuth::parseToken()->authenticate();
        $type = Auth::user()->role_id;
        if ($type != 1) {
            return response()->json([
                'ok'    => true
            ], 200);
        } else {
            return response()->json([
                'ok'    => false
            ], 401);
        }
    }

    public function getCurrentUser()
    {
        // Devuelve el usuario autenticado actualmente
        return response()->json(Auth::user());
    }

    public function isAuthenticated()
    {
        // Verifica si hay un usuario autenticado
        return response()->json(['authenticated' => Auth::check()]);
    }
}

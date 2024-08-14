<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Aplicant;
use App\Models\Log;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class VerifyController extends Controller
{
    public function verify(Request $request, $email)
    {
        // return response()->json([$request->all(), $email]);
        $user = Aplicant::where('verification_token', $request->token)->where('email',$email)->first();

        if (!$user) {
            return response()->json(['message' => 'Token de verificación inválido','code'=>404], 404);
        }

        $user->email_verified_at = now(); // Marcar el correo como verificado
        $user->verification_token = null; // Limpiar el token de verificación
        $user->save();

        // Log::create([
        //     'user_id' => $user->id, // o null si el usuario no está autenticado
        //     'action' => 'Usuario Verificado',
        //     'description' => 'Usuario verificado con correo '.$user->email.'.',
        //     'status' => 0,
        //     'read' => 0,
        // ]);

        return response()->json(['message' => 'Correo verificado con éxito','code' => 200]);
    }

    public function resendVerificationEmail($email)
    {
        $user = Aplicant::where('email', $email)->first(); // Buscar el usuario por correo electrónico

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        if ($user->email_verified_at) {
            return response()->json(['message' => 'El correo electrónico ya ha sido verificado'], 400);
        }

        $user->verification_token = rand(10000, 99999); // Generar un número aleatorio de 5 dígitos
        $user->save();

        // Obtener el nombre del usuario (si está disponible)
        $name = $user ? $user->name : '';
        // Generar la URL de restablecimiento de contraseña con el token
        $number = $user->verification_token;
        $email = $user->email;

        // Enviar el correo electrónico utilizando la vista personalizada
        Mail::send('emails.verify', [
            'name' => $name,
            'number' => $number,
            'curp' => $user->curp
        ], function (Message $message) use ($email) {
            $message->to($email)
                ->subject('Portal de Becas - Correo de Verificación');
        });

        return response()->json(['message' => 'Correo de verificación enviado', 'code' => 200]);
    }
}

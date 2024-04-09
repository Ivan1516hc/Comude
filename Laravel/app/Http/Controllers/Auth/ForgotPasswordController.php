<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Aplicant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    // Método para enviar el correo electrónico de restablecimiento de contraseña
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = Aplicant::where('email', $request->get('email'))->first();

        if (!$user) {
            return response()->json([
                'code'    => 401,
                'message' => 'No se pudo enviar el correo electrónico.'
            ]);
        }


        // Eliminar el token existente si existe
        DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->delete();

        // Generar un nuevo token y guardarlo en la tabla password_reset_tokens
        $token = Password::getRepository()->create($user);

        if ($token) {
            // Obtener la dirección de correo electrónico del usuario
            $email = $request->email;

            // Obtener el nombre del usuario (si está disponible)
            $user = Aplicant::where('email', $email)->first();
            $name = $user ? $user->name : '';
            $appFrontUrl = env('APP_FRONT');
            // Generar la URL de restablecimiento de contraseña con el token
            $resetUrl = url($appFrontUrl.'/auth/restablecer/'.$token.'/'.$email);

            // Enviar el correo electrónico utilizando la vista personalizada
            Mail::send('emails.reset-password', [
                // 'name' => $name,
                'resetUrl' => $resetUrl
            ], function (Message $message) use ($email) {
                $message->to($email)
                    ->subject('Restablecimiento de Contraseña');
            });

            return response()->json([
                'code'    => 200,
                'message' => 'Correo electrónico de restablecimiento de contraseña enviado. REVISA TU CORREO.'
            ]);
        } else {
            return response()->json([
                'code'    => 401,
                'message' => 'No se pudo enviar el correo electrónico de restablecimiento de contraseña.'
            ]);
        }
    }

    // Método para obtener la instancia del Password Broker
    public function broker()
    {
        return Password::broker();
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Aplicant;
use App\Models\User;
use Illuminate\Support\Str;
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
        $request->validate(['curp' => 'required|regex:/^[A-Z0-9]{18}$/']); // Validar el formato de la CURP

        $user = Aplicant::where('curp', $request->curp)->first();

        if (!$user) {
            return response()->json([
                'code'    => 404,
                'message' => 'No se encontró ningún usuario con esa CURP.'
            ]);
        }

        // Eliminar el token existente si existe
        DB::table('password_reset_tokens')
            ->where('curp', $request->curp)
            ->delete();

        try {
            // Generar un nuevo token personalizado
            $token = Str::random(60);

            // Guardar el token en la tabla password_reset_tokens
            DB::table('password_reset_tokens')->insert([
                'curp' => $user->curp,
                'token' => hash('sha256', $token),  // O encriptar el token de manera segura
                'created_at' => now(),
            ]);
            $appFrontUrl = env('APP_FRONT');
            // Generar la URL de restablecimiento de contraseña con el token
            $resetUrl = url($appFrontUrl.'/auth/restablecer/'.$token.'/'.$user->curp);
            // Enviar el correo electrónico utilizando la vista personalizada
            Mail::send('emails.reset-password', [
                'resetUrl' => $resetUrl,
            ], function (Message $message) use ($user) {
                $message->to($user->email)
                    ->subject('Restablecimiento de Contraseña');
            });

            return response()->json([
                'code'    => 200,
                'message' => 'Correo electrónico de restablecimiento de contraseña enviado. REVISA TU CORREO.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code'    => 500,
                'message' => 'Ocurrió un error al intentar enviar el correo electrónico de restablecimiento de contraseña.'
            ]);
        }
    }


    // Método para obtener la instancia del Password Broker
    public function broker()
    {
        return Password::broker();
    }
}

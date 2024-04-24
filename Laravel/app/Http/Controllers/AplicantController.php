<?php

namespace App\Http\Controllers;

use App\Models\Aplicant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Validator;

class AplicantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $user = Auth::user();
        if (!$user) {
            $response['message'] = "Necesitas loguearte";
            $response['code'] = 404;
            return response()->json($response);
        }

        $query = Aplicant::find($user->id);

        return response()->json($query);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Aplicant $aplicant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            $response['message'] = "Necesitas loguearte";
            $response['code'] = 404;
            return response()->json($response);
        }
        // dd($user->id);
        DB::beginTransaction();
        try {
            $aplicant = Aplicant::find($user->id);
            $aplicant->update(
                $request->all()
            );
            
            DB::commit();
            $response['message'] = "Información actualizada.";
            $response['code'] = 200;
        } catch (\Throwable $th) {
            DB::rollBack();
            $response['message'] = "No se a podido actualizar la información.";
            $response['code'] = 202;
        }
        return response()->json($response);
    }

    public function updatePassword(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Necesitas iniciar sesión', 'code' => 404]);
        }
    
        // Validar los datos del formulario
        $validator = Validator::make($request->all(), [
            'password' => ['required', 'string'],
            'new_password' => ['required', 'string', 'min:6'],
            'new_password_repeat' => ['required', 'string', 'same:new_password'],
        ]);
    
        // Si la validación falla, devolver los errores
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first(), 'code' => 400]);
        }
    
        // Verificar si la contraseña actual es correcta
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'La contraseña actual es incorrecta.', 'code' => 400]);
        }
    
        // Actualizar la contraseña del usuario
        $user->password = $request->new_password;
        $user->save();
    
        return response()->json(['message' => 'Contraseña actualizada correctamente.', 'code' => 200]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Aplicant $aplicant)
    {
        //
    }
}

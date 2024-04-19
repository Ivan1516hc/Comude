<?php

namespace App\Http\Controllers;

use App\Models\Aplicant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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

    public function updatePassword()
    {
        $user = Auth::user();
        if (!$user) {
            $response['message'] = "Necesitas loguearte";
            $response['code'] = 404;
            return response()->json($response);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Aplicant $aplicant)
    {
        //
    }
}

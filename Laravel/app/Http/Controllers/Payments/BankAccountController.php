<?php

namespace App\Http\Controllers\Payments;

use App\Http\Controllers\Controller;
use App\Models\Aplicant;
use App\Models\BankAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BankAccountController extends Controller
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
        $user = Auth::user();
        if (!$user) {
            $response['message'] = "Necesitas loguearte";
            $response['code'] = 404;
            return response()->json($response);
        }

        $aplicant = Aplicant::find($request->aplicant_id);

        if (!$aplicant) {
            $response['message'] = "Solicitante no encontrado, no se puede vincular la cuenta bancaria.";
            $response['code'] = 202;
            return response()->json($response);
        }

        DB::beginTransaction();
        try {
            $newIdBankAccount = BankAccount::create($request->all())->id;
            $aplicant->update([
                'bank_account_id' => $newIdBankAccount
            ]);

            DB::commit();
            $response['message'] = "Información bancaria registrada correctamente.";
            $response['code'] = 200;
        } catch (\Throwable $th) {
            DB::rollBack();
            $response['message'] = "No se a podido registrar la información.";
            $response['code'] = 202;
        }
        return response()->json($response);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = Auth::user();
        if (!$user) {
            $response['message'] = "Necesitas loguearte";
            $response['code'] = 404;
            return response()->json($response);
        }

        $model = BankAccount::query();

        $model->whereHas('request', function ($query) use ($id) {
            $query->where('id', $id);
        })->with('state', 'competition_type', 'country');

        $query = $model->first();

        return response()->json($query);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BankAccount $bankAccount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BankAccount $bankAccount)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BankAccount $bankAccount)
    {
        //
    }
}

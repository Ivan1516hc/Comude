<?php

namespace App\Http\Controllers\Payments;

use App\Http\Controllers\Controller;
use App\Models\Aplicant;
use App\Models\BankAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'Necesitas loguearte', 'code' => 404]);
            }

            $aplicant = Aplicant::find($user->id);
            if (!$aplicant) {
                return response()->json(['message' => 'Solicitante no encontrado, no se puede vincular la cuenta bancaria.', 'code' => 202]);
            }

            DB::beginTransaction();

            // Validar y guardar el archivo
            $customFileName = null;
            if ($request->hasFile('account_status_url')) {
                $file = $request->file('account_status_url');
                $fileExtension = $file->getClientOriginalExtension();
                $allowedExtensions = ['pdf', 'docx', 'doc'];
                if (!in_array($fileExtension, $allowedExtensions)) {
                    return response()->json(['message' => 'La extensión del archivo no es válida.', 'code' => 201]);
                }
                $maxFileSize = 700 * 1024; // 700kB
                if ($file->getSize() > $maxFileSize) {
                    return response()->json(['message' => 'El tamaño del archivo "Estado de cuenta" es demasiado grande.', 'code' => 201]);
                }
                $customFileName = 'solicitud_' . $request->request_id . '_cuenta_bancaria.' . $fileExtension;
                $filePath = Storage::disk('sports')->put($customFileName, file_get_contents($file));
                if (!$filePath) {
                    throw new \Exception('Error al guardar el archivo.');
                }
            }

            // Crear cuenta bancaria
            $bankAccountData = $request->except('account_status_url');
            if ($customFileName) {
                $bankAccountData['account_status_url'] = $customFileName;
            }
            $bankAccount = BankAccount::create($bankAccountData);

            // Asignar cuenta bancaria al solicitante
            $aplicant->update(['bank_account_id' => $bankAccount->id]);

            DB::commit();

            return response()->json(['message' => 'Información bancaria registrada correctamente.', 'code' => 200]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar la información.', 'code' => 202]);
        }
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

        $model->whereHas('aplicant.requests', function ($query) use ($id) {
            $query->where('requests.id', $id);
        });

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

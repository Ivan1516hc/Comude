<?php

namespace App\Http\Controllers\Payments;

use App\Http\Controllers\Controller;
use App\Models\Aplicant;
use App\Models\BankAccount;
use App\Models\ModifyForm;
use App\Models\Requests;
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
            $user = Auth::guard('aplicant')->user();
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
                $allowedExtensions = ['pdf'];
                if (!in_array($fileExtension, $allowedExtensions)) {
                    return response()->json(['message' => 'La extensión del archivo no es válida.', 'code' => 201]);
                }
                $maxFileSize = 700 * 1024; // 700kB
                if ($file->getSize() > $maxFileSize) {
                    return response()->json(['message' => 'El tamaño del archivo "Estado de cuenta" es demasiado grande, puedes reducir el tamaño en el siguiente enlace https://www.ilovepdf.com/es/comprimir_pdf.', 'code' => 201]);
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

            // Asignar cuenta bancaria a la solicitud
            Requests::find($request->request_id)->update(['bank_account_id' => $bankAccount->id]);

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
        $user = Auth::guard('aplicant')->user();
        if (!$user) {
            $response['message'] = "Necesitas loguearte";
            $response['code'] = 404;
            return response()->json($response);
        }

        $model = BankAccount::query();

        $query = $model->whereHas('request', function ($query) use ($id) {
            $query->where('id', $id);
        })->first();

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
    public function update(Request $request)
    {
        try {
            $req = Requests::find($request->request_id);
            // Obtén el usuario autenticado
            $user = Auth::guard('aplicant')->user();
            if (!$user) {
                return response()->json(['message' => 'Necesitas loguearte', 'code' => 404]);
            }

            // Busca el solicitante
            $aplicant = Aplicant::find($user->id);
            if (!$aplicant) {
                return response()->json(['message' => 'Solicitante no encontrado, no se puede vincular la cuenta bancaria.', 'code' => 202]);
            }

            // Inicia una transacción
            DB::beginTransaction();

            // Obtén la cuenta bancaria asociada
            $account = BankAccount::where('id', $req->bank_account_id)->first();

            // Verifica si hay solicitudes en proceso
            $requests = $aplicant->requests()->whereIn('requests.status_request_id', [3, 2])->first();
            if ($requests) {
                return response()->json(['message' => 'No puedes actualizar la información bancaria, ya que tienes una solicitud en proceso.', 'code' => 202]);
            }

            // Validar y guardar el archivo
            $customFileName = null;
            if ($request->hasFile('account_status_url')) {
                $file = $request->file('account_status_url');
                $fileExtension = $file->getClientOriginalExtension();
                $allowedExtensions = ['pdf'];

                // Validar la extensión del archivo
                if (!in_array($fileExtension, $allowedExtensions)) {
                    return response()->json(['message' => 'La extensión del archivo no es válida.', 'code' => 201]);
                }

                // Validar el tamaño del archivo
                $maxFileSize = 700 * 1024; // 700kB
                if ($file->getSize() > $maxFileSize) {
                    return response()->json(['message' => 'El tamaño del archivo "Estado de cuenta" es demasiado grande, puedes reducir el tamaño en el siguiente enlace https://www.ilovepdf.com/es/comprimir_pdf.', 'code' => 201]);
                }

                // Elimina el archivo existente si existe
                if (Storage::disk('sports')->exists($account->account_status_url)) {
                    Storage::disk('sports')->delete($account->account_status_url);
                }

                // Guarda el nuevo archivo
                $customFileName = 'solicitud_' . $request->request_id . '_cuenta_bancaria.' . $fileExtension;
                $filePath = Storage::disk('sports')->put($customFileName, file_get_contents($file));

                // Verifica si el archivo se guardó correctamente
                if (!$filePath) {
                    return response()->json(['message' => 'Error al guardar el archivo.', 'code' => 500]);
                }
            }

            // Actualiza la cuenta bancaria
            $bankAccountData = $request->except(['account_status_url', 'request_id']);
            if ($customFileName) {
                $bankAccountData['account_status_url'] = $customFileName;
            }

            BankAccount::where('id', $req->bank_account_id)->update($bankAccountData);

            // Actualiza el estado de la solicitud
            
            if ($req && $req->status_request_id == 4) {
                ModifyForm::where(['request_id' => $request->request_id, 'form_id' => 2])->update(['status' => 1]);

                if (ModifyForm::where(['request_id' => $request->request_id, 'status' => 0])->count() == 0) {
                    $req->update(['status_request_id' => 2]);
                }
            }

            // Confirma la transacción
            DB::commit();

            return response()->json(['message' => 'Información bancaria actualizada correctamente.', 'code' => 200]);
        } catch (\Throwable $th) {
            // Reversa la transacción en caso de error
            DB::rollBack();
            return response()->json(['message' => 'Error al actualizar la información.', 'code' => 202, 'error' => $th->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BankAccount $bankAccount)
    {
        //
    }
}

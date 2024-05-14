<?php

namespace App\Http\Controllers\Documents;

use App\Http\Controllers\Controller;
use App\Models\JustificationTypes;
use App\Models\RequestJustification;
use App\Models\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class RequestJustificationController extends Controller
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

            DB::beginTransaction();

            // Validar y guardar el archivo
            $customFileName = $this->saveFile($request, 'file');

            RequestJustification::create([
                'description' => $request->description,
                'file_name' => $customFileName,
                'justification_type_id' => $request->justification_type_id,
                'request_id' => $request->request_id
            ]);

            DB::commit();

            return response()->json(['message' => 'Evidencia registrado correctamente.', 'code' => 200]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage(), 'code' => 202]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = Auth::guard('aplicant')->user();
        if (!$user) {
            return response()->json(['message' => 'Necesitas loguearte', 'code' => 404]);
        }

        // Obtener los documentos asociados al procedimiento
        $documents = RequestJustification::where('request_id', $id)->get();
        $catalog = JustificationTypes::all();
        $request = Requests::find($id);

        return response()->json(['data' => $documents, 'catalogs' => $catalog, 'request' => $request]);
    }

    public function saveFile(Request $request, $fileFieldName)
    {
        $user = Auth::guard('aplicant')->user();

        $countDocuments = RequestJustification::where('request_id', $request->request_id)->get()->count();

        if ($request->hasFile($fileFieldName)) {
            $file = $request->file($fileFieldName);
            $fileExtension = $file->getClientOriginalExtension();
            $allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];

            if (!in_array($fileExtension, $allowedExtensions)) {
                throw new \Exception('La extensión del archivo no es válida.');
            }

            $maxFileSize = 1024  * 1024; // 1MB
            if ($file->getSize() > $maxFileSize) {
                if ($fileExtension == 'pdf') {
                    throw new \Exception('El tamaño del archivo es demasiado grande, puedes reducir el tamaño en el siguiente enlace https://www.ilovepdf.com/es/comprimir_pdf');
                } else if ($fileExtension == 'jpg' || $fileExtension == 'jpeg' || $fileExtension == 'png') {
                    throw new \Exception('El tamaño del archivo es demasiado grande, puedes reducir el tamaño en el siguiente enlace https://www.iloveimg.com/es/comprimir-imagen');
                } else {
                    throw new \Exception('El tamaño del archivo es demasiado grande.');
                }
            }

            $customFileName = 'solicitud_' . $request->request_id . '_evidencia_' . ($countDocuments + 1) . '.' . $fileExtension;
            $filePath = Storage::disk('sports')->put($customFileName, file_get_contents($file));
            if (!$filePath) {
                throw new \Exception('Error al guardar el archivo.');
            }
            return $customFileName;
        } else {
            throw new \Exception('El archivo no fue encontrado en la solicitud.');
        }
    }

    public function finish($id)
    {
        $user = Auth::guard('aplicant')->user();
        if (!$user) {
            $response['message'] = "Necesitas loguearte";
            $response['code'] = 404;
            return response()->json($response);
        }
        // dd($user->id);
        DB::beginTransaction();
        try {
            $requests = Requests::find($id);
            $requests->update(
                ['status_request_id' => 7]
            );

            DB::commit();
            $response['message'] = "Evidencias enviadas.";
            $response['code'] = 200;
        } catch (\Throwable $th) {
            DB::rollBack();
            $response['message'] = "No se a podido enviar las evidencia.";
            $response['code'] = 202;
        }
        return response()->json($response);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RequestJustification $requestJustification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RequestJustification $requestJustification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id)
    {
        try {
            $item = RequestJustification::find($id);

            if (!$item) {
                return response()->json(['message' => 'La evidencia no existe.', 'code' => 404]);
            }

            $item->delete();

            return response()->json(['message' => 'Evidencia eliminada correctamente.', 'code' => 200]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al eliminar la evidencia.', 'code' => 500]);
        }
    }
}

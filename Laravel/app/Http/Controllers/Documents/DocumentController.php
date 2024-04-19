<?php

namespace App\Http\Controllers\Documents;

use App\Http\Controllers\Controller;
use App\Models\DocumentProcedure;
use App\Models\DocumentsRequest;
use App\Models\Procedure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
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

            DB::beginTransaction();

            // Validar y guardar el archivo
            $customFileName = $this->saveFile($request, 'file');

            DocumentsRequest::create([
                'file_name' => $customFileName,
                'document_procedure_id' => $request->type_file,
                'request_id' => $request->request_id
            ]);

            $totalDocuments = DocumentsRequest::where('request_id', $request->request_id)->get()->count();


            DB::commit();

            return response()->json(['message' => 'Documento registrado correctamente.', 'code' => 200, 'total_documents' => $totalDocuments]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar el documento.', 'code' => 202]);
        }
    }

    public function saveFile(Request $request, $fileFieldName)
    {
        if ($request->hasFile($fileFieldName)) {
            $file = $request->file($fileFieldName);
            $fileExtension = $file->getClientOriginalExtension();
            $allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
            if (!in_array($fileExtension, $allowedExtensions)) {
                throw new \Exception('La extensión del archivo no es válida.');
            }
            $maxFileSize = 700 * 1024; // 700kB
            if ($file->getSize() > $maxFileSize) {
                throw new \Exception('El tamaño del archivo es demasiado grande.');
            }
            $customFileName = 'solicitud_' . $request->request_id . '_' . strtolower(str_replace(' ', '_', $request->name_file)) . '.' . $fileExtension;
            $filePath = Storage::disk('sports')->put($customFileName, file_get_contents($file));
            if (!$filePath) {
                throw new \Exception('Error al guardar el archivo.');
            }
            return $customFileName;
        } else {
            throw new \Exception('El archivo no fue encontrado en la solicitud.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Necesitas loguearte', 'code' => 404]);
        }

        // Buscar el procedimiento
        $procedure = Procedure::whereHas('announcements.requests', function ($query) use ($id) {
            return $query->where('requests.id', $id);
        })->first();

        // Si no se encuentra ningún procedimiento, retornar un mensaje de error
        if (!$procedure) {
            return response()->json(['message' => 'No se encontró ningún procedimiento para la solicitud dada', 'code' => 404]);
        }

        // Obtener los documentos asociados al procedimiento
        $documents = DocumentProcedure::where('procedure_id', $procedure->id)
            ->with(['documents_request.requests' => function ($query) use ($id) {
                return $query->where('requests.id', $id);
            }])->get();

        return response()->json($documents);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DocumentsRequest $requestDocument)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DocumentsRequest $requestDocument)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DocumentsRequest $requestDocument)
    {
        //
    }
}

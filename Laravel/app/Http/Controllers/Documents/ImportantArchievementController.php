<?php

namespace App\Http\Controllers\Documents;

use App\Http\Controllers\Controller;
use App\Models\ImportantArchievement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ImportantArchievementController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

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

            ImportantArchievement::create([
                'description' => $request->description,
                'file_name' => $customFileName,
                'aplicant_id' => $user->id
            ]);

            DB::commit();

            return response()->json(['message' => 'Documento registrado correctamente.', 'code' => 200]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage(), 'code' => 202]);
        }
    }

    public function saveFile(Request $request, $fileFieldName)
    {
        $user = Auth::guard('aplicant')->user();

        $countDocuments = ImportantArchievement::where('aplicant_id', $user->id)->get()->count();

        if ($request->hasFile($fileFieldName)) {
            $file = $request->file($fileFieldName);
            $fileExtension = $file->getClientOriginalExtension();
            $allowedExtensions = ['jpg', 'jpeg', 'png'];

            if (!in_array($fileExtension, $allowedExtensions)) {
                throw new \Exception('La extensión del archivo no es válida.');
            }

            $maxFileSize = 1024  * 1024; // 1MB

            if ($file->getSize() > $maxFileSize) {
                throw new \Exception('El tamaño del archivo es demasiado grande, puedes reducir el tamaño en el siguiente enlace https://www.iloveimg.com/es/comprimir-imagen');
            }

            $customFileName = 'solicitante_' . $user->id . '_logro_importante_' . ($countDocuments + 1) . '.' . $fileExtension;
            $filePath = Storage::disk('sports')->put($customFileName, file_get_contents($file));
            if (!$filePath) {
                throw new \Exception('Error al guardar el archivo.');
            }
            return $customFileName;
        } else {
            throw new \Exception('El archivo no fue encontrado en la solicitud.');
        }
    }

    public function show()
    {
        $user = Auth::guard('aplicant')->user();
        if (!$user) {
            return response()->json(['message' => 'Necesitas loguearte', 'code' => 404]);
        }

        // Obtener los documentos asociados al procedimiento
        $documents = ImportantArchievement::where('aplicant_id', $user->id)->get();

        return response()->json($documents);
    }

    public function edit(ImportantArchievement $importantArchievement)
    {
        //
    }

    public function update(Request $request, ImportantArchievement $importantArchievement)
    {
        //
    }

    public function delete($id)
    {
        try {
            $item = ImportantArchievement::find($id);

            if (!$item) {
                return response()->json(['message' => 'El logro importante no existe', 'code' => 404]);
            }

            $item->delete();

            return response()->json(['message' => 'Logro importante eliminado correctamente', 'code' => 200]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al eliminar el logro importante', 'code' => 500]);
        }
    }
}

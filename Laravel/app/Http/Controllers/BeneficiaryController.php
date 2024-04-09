<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\AddressBeneficiary;
use App\Models\Beneficiary;
use App\Models\BeneficiaryRequest;
use App\Models\EconomicBeneficiary;
use App\Models\Log;
use App\Models\ModifyForm;
use App\Models\RequestDocument;
use App\Models\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BeneficiaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $model = Beneficiary::all();
        return response()->json($model);
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
        // return response()->json($request->all());
        $body = $request->all();
        $requests = Requests::where('id', $request->request_id)->where('user_id', $user->id)->get();

        if (!$requests->isEmpty()) {
            DB::beginTransaction();
            try {
                $newBeneficiary = Beneficiary::create($body);

                if ($body['address_id'] == null) {
                    $newAddress = Address::create($body);
                    AddressBeneficiary::create([
                        'beneficiary_id' => $newBeneficiary->id,
                        'address_id' => $newAddress->id,
                    ]);
                } else {
                    AddressBeneficiary::create([
                        'beneficiary_id' => $newBeneficiary->id,
                        'address_id' => $body['address_id'],
                    ]);
                }

                $body['beneficiary_id'] = $newBeneficiary->id;
                $request['beneficiary_id'] = $newBeneficiary->id;
                BeneficiaryRequest::create($body);
                EconomicBeneficiary::create([
                    'ocupacion' => $request->ocupacion,
                    'parentesco' => $request->parentesco,
                    'lugar_nacimiento' => $request->lugar_nacimiento,
                    'estado_civil' => $request->estado_civil,
                    'estado_religioso' => $request->estado_religioso,
                    'trabaja' => $request->trabaja,
                    'lugar_trabajo' => $request->lugar_trabajo,
                    'calle_trabajo' => $request->calle_trabajo,
                    'telefono_trabajo' => $request->telefono_trabajo,
                    'telefono_ext_trabajo' => $request->telefono_ext_trabajo,
                    'jefe_inmediato' => $request->jefe_inmediato,
                    'codigo_trabajo' => $request->codigo_trabajo,
                    'colonia_trabajo' => $request->colonia_trabajo,
                    'colonia_name_trabajo' => $request->colonia_name_trabajo,
                    'municipio_trabajo' => $request->municipio_trabajo,
                    'estado_trabajo' => $request->estado_trabajo,
                    'entrada_trabajo' => $request->entrada_trabajo,
                    'salida_trabajo' => $request->salida_trabajo,
                    'ingreso_mensual_bruto' => $request->ingreso_mensual_bruto,
                    'ingreso_mensual_neto' => $request->ingreso_mensual_neto,
                    'beneficiary_id' => $request->beneficiary_id,

                    'puesto' => $request->puesto,
                    'antiguedad' => $request->antiguedad,
                    'numext_trabajo' => $request->numext_trabajo,
                    'numint_trabajo' => $request->numint_trabajo,
                    'primer_cruce_trabajo' => $request->primer_cruce_trabajo,
                    'segundo_cruce_trabajo' => $request->segundo_cruce_trabajo,
                    'otro_trabajo' => $request->otro_trabajo,
                ]);
                Log::create([
                    'user_id' => auth()->id(), // o null si el usuario no está autenticado
                    'request_id' => $requests[0]->id,
                    'beneficiary_id' => $newBeneficiary->id,
                    'action' => 'Tutor creado',
                    'description' => 'Tutor dado de alta para la solicitud con folio No.' . $requests[0]->invoice . '.',
                    'status' => 0,
                    'read' => 0
                ]);

                DB::commit();
                $response['message'] = "Beneficiario registradao correctamente";
                $response['code'] = 200;
            } catch (\Throwable $th) {
                DB::rollBack();
                $response['message'] = "No se ha podido crear el trabajador";
                $response['code'] = 202;
            }
        } else {
            $response['message'] = "No se ha encontrado la solicitud";
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
        if ($user->role_id == 1) {
            $rule = Beneficiary::where('id', $id)->whereHas('requests', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->get();

            if ($rule->isEmpty()) {
                $response['message'] = "Beneficiario no encontrado";
                $response['code'] = 404;
                return response()->json($response);
            }
        }
        $query = Beneficiary::query();
        $beneficiary = $query->where('id', $id)->with('economic', 'requests.modify_forms')->first();
        return response()->json($beneficiary);
    }

    public function uploadDocuments(Request $request)
    {

        $requests = Requests::find($request->request_id);
        $beneficiary = Beneficiary::find($request->beneficiary_id);

        // Obtener el archivo de la solicitud
        $front_ine = $request->file('front_ine');
        $behind_ine = $request->file('behind_ine');

        // Obtener la extensión de los archivos
        $frontExtension = $front_ine->getClientOriginalExtension();
        $behindExtension = $behind_ine->getClientOriginalExtension();

        // Personalizar el nombre del archivo, incluyendo la extensión
        $customFileName = 'ine_' . $requests->invoice . '_' . $request->beneficiary_id . '_flontal.' . $frontExtension;
        $customFile2Name = 'ine_' . $requests->invoice . '_' . $request->beneficiary_id . '_trasera.' . $behindExtension;

        // Guardar los archivos en el disco 'ine'
        $filePath = Storage::disk('ine')->put($customFileName, file_get_contents($front_ine));
        $filePath2 = Storage::disk('ine')->put($customFile2Name, file_get_contents($behind_ine));

        if ($filePath == 1 && $filePath2 == 1) {
            // Aquí puedes guardar la información en la base de datos si es necesario
            RequestDocument::create([
                'required_document_id' => 1,
                'request_id' => $request->request_id,
                'beneficiary_id' => $request->beneficiary_id,
                'url' => $customFileName
            ]);

            RequestDocument::create([
                'required_document_id' => 1,
                'request_id' => $request->request_id,
                'beneficiary_id' => $request->beneficiary_id,
                'url' => $customFile2Name
            ]);

            Log::create([
                'user_id' => auth()->id(), // o null si el usuario no está autenticado
                'request_id' => $requests->id,
                'beneficiary_id' => $beneficiary->id,
                'action' => 'Documentos subidos',
                'description' => 'Documentos de identificación subidos del beneficiario ' . $beneficiary->id . ' de la solicitud con No. ' . $requests->invoice . '.',
                'status' => 0,
                'read' => 0
            ]);

            return response()->json(['message' => 'Archivos subidos exitosamente.', 'code' => 200]);
        } else {
            return response()->json(['message' => 'No se pudo subir los archivos.', 'code' => 201]);
        }
    }

    public function uploadDocumentsCisz(Request $request)
    {

        $requests = Requests::find($request->request_id);
        $beneficiary = Beneficiary::find($request->beneficiary_id);

        // Obtener el archivo de la solicitud
        $employee_id = $request->file('employee_id');
        $document_cisz = $request->file('document_cisz');

        // Obtener la extensión de los archivos
        $frontExtension = $employee_id->getClientOriginalExtension();
        $behindExtension = $document_cisz->getClientOriginalExtension();

        if ($behindExtension == 'pdf' || $behindExtension == 'docx' ||  $behindExtension == 'doc') {
            if ($frontExtension == 'png' ||  $frontExtension == 'jpg' ||  $frontExtension == 'jpeg') {

                // Verificar el tamaño de los archivos
                $maxFileSize = 3 * 1024 * 1024; // 3MB (cambiar según tus necesidades)
                if ($employee_id->getSize() > $maxFileSize) {
                    return response()->json(['message' => 'El tamaño del archivo "identificación" es demasiado grande.', 'code' => 201]);
                }
                if ($document_cisz->getSize() > $maxFileSize) {
                    return response()->json(['message' => 'El tamaño del archivo "carta intención" es demasiado grande.', 'code' => 201]);
                }

                // Personalizar el nombre del archivo, incluyendo la extensión
                $customFileName = 'id_empleado_' . $requests->invoice . '_' . $request->beneficiary_id . '.' . $frontExtension;
                $customFile2Name = 'cisz_documento_' . $requests->invoice . '_' . $request->beneficiary_id . '.' . $behindExtension;

                // Guardar los archivos en el disco 'documentos_cisz'
                $filePath = Storage::disk('documentos_cisz')->put($customFileName, file_get_contents($employee_id));
                $filePath2 = Storage::disk('documentos_cisz')->put($customFile2Name, file_get_contents($document_cisz));

                if ($filePath == 1 && $filePath2 == 1) {
                    DB::beginTransaction();
                    try {
                        // Aquí puedes guardar la información en la base de datos si es necesario
                        RequestDocument::create([
                            'required_document_id' => 2,
                            'request_id' => $request->request_id,
                            'beneficiary_id' => $request->beneficiary_id,
                            'url' => $customFile2Name
                        ]);

                        Log::create([
                            'user_id' => auth()->id(), // o null si el usuario no está autenticado
                            'request_id' => $requests->id,
                            'beneficiary_id' => $beneficiary->id,
                            'action' => 'Documento subido',
                            'description' => 'Documento CISZ del beneficiario ' . $beneficiary->id . ' de la solicitud con No. ' . $requests->invoice . '.',
                            'status' => 0,
                            'read' => 0
                        ]);

                        RequestDocument::create([
                            'required_document_id' => 3,
                            'request_id' => $request->request_id,
                            'beneficiary_id' => $request->beneficiary_id,
                            'url' => $customFileName
                        ]);

                        Log::create([
                            'user_id' => auth()->id(), // o null si el usuario no está autenticado
                            'request_id' => $requests->id,
                            'beneficiary_id' => $beneficiary->id,
                            'action' => 'Documento subido',
                            'description' => 'Documento de identificación de empleado ' . $beneficiary->id . ' de la solicitud con No. ' . $requests->invoice . '.',
                            'status' => 0,
                            'read' => 0
                        ]);

                        DB::commit();

                        return response()->json(['message' => 'Archivos subidos exitosamente.', 'code' => 200]);
                    } catch (\Throwable $th) {
                        DB::rollBack();
                        return response()->json(['message' => 'No se pudo subir los archivos.', 'code' => 201]);
                    }
                } else {
                    return response()->json(['message' => 'No se pudo subir los archivos.', 'code' => 201]);
                }
            } else {
                return response()->json(['message' => 'Verifica que la imagen sea un formato valido.', 'code' => 201]);
            }
        } else {
            return response()->json(['message' => 'Verifica que el formato del documento sea valido.', 'code' => 201]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Beneficiary $beneficiary)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function patch(Request $request, $id, $form_id = null)
    {
        $user = Auth::user();
        $body = $request->all();
        try {
            $beneficiary = Beneficiary::find($id);

            // return response()->json($form_id);
            if ($beneficiary) {
                DB::beginTransaction();
                // Actualiza los datos específicos del beneficiario
                $beneficiary->update($body);

                if ($body['address_id'] == null) {
                    $newAddress = Address::create($body);
                    AddressBeneficiary::create([
                        'beneficiary_id' => $beneficiary->id,
                        'address_id' => $newAddress->id,
                    ]);
                } else {
                    $address = Address::find($body['address_id']);
                    $address->update($body);

                    $addressExist = AddressBeneficiary::where('beneficiary_id', $beneficiary->id)->where('address_id', $body['address_id'])->first();
                    if (!$addressExist) {
                        AddressBeneficiary::create([
                            'beneficiary_id' => $beneficiary->id,
                            'address_id' => $body['address_id'],
                        ]);
                    }
                }

                EconomicBeneficiary::where('beneficiary_id', $beneficiary->id)->update([
                    'ocupacion' => $request->ocupacion,
                    'parentesco' => $request->parentesco,
                    'lugar_nacimiento' => $request->lugar_nacimiento,
                    'estado_civil' => $request->estado_civil,
                    'estado_religioso' => $request->estado_religioso,
                    'trabaja' => $request->trabaja,
                    'lugar_trabajo' => $request->lugar_trabajo,
                    'calle_trabajo' => $request->calle_trabajo,
                    'telefono_trabajo' => $request->telefono_trabajo,
                    'telefono_ext_trabajo' => $request->telefono_ext_trabajo,
                    'jefe_inmediato' => $request->jefe_inmediato,
                    'codigo_trabajo' => $request->codigo_trabajo,
                    'colonia_trabajo' => $request->colonia_trabajo,
                    'colonia_name_trabajo' => $request->colonia_name_trabajo,
                    'municipio_trabajo' => $request->municipio_trabajo,
                    'estado_trabajo' => $request->estado_trabajo,
                    'entrada_trabajo' => $request->entrada_trabajo,
                    'salida_trabajo' => $request->salida_trabajo,
                    'ingreso_mensual_bruto' => $request->ingreso_mensual_bruto,
                    'ingreso_mensual_neto' => $request->ingreso_mensual_neto,
                    'beneficiary_id' => $beneficiary->id,

                    'puesto' => $request->puesto,
                    'antiguedad' => $request->antiguedad,
                    'numext_trabajo' => $request->numext_trabajo,
                    'numint_trabajo' => $request->numint_trabajo,
                    'primer_cruce_trabajo' => $request->primer_cruce_trabajo,
                    'segundo_cruce_trabajo' => $request->segundo_cruce_trabajo,
                    'otro_trabajo' => $request->otro_trabajo,
                ]);

                if ($form_id) {
                    // El parámetro form_id está presente en la URL
                    $modify = ModifyForm::find($form_id);
                    $modify->update(['status' => 1]);
                    $message = 'Tutor actualizado correctamente por motivos de corrección, identificador de peteción ' . $form_id . '.';
                } else {
                    // El parámetro form_id no está presente en la URL
                    $message = 'Tutor actualizado correctamente.';
                }

                // Actualiza cualquier otra lógica que necesites
                Log::create([
                    'user_id' => auth()->id(), // o null si el usuario no está autenticado
                    'beneficiary_id' => $id,
                    'action' => 'Tutor Actualizado',
                    'description' => $message,
                    'status' => 0,
                    'read' => 0
                ]);
                DB::commit();

                $response['beneficiary_id'] = $beneficiary->id;
                $response['message'] = "Beneficiario actualizado correctamente";
                $response['code'] = 200;
            } else {
                $response['message'] = "Beneficiario no encontrado";
                $response['code'] = 404;
            }

            return response()->json($response);
        } catch (\Illuminate\Database\QueryException $e) {
            // Puedes manejar específicamente las excepciones de consulta de Laravel
            // Log, notifica, etc.
            return response()->json(['code' => 200, 'message' => 'No se ha podido crear el beneficiario. ' . $e->getMessage()]);
        } catch (\Exception $e) {
            // Otras excepciones
            // Log, notifica, etc.
            return response()->json(['code' => 200, 'message' => 'Error desconocido. ' . $e->getMessage()]);
        }
    }

    public function search($value)
    {
        $user = Auth::user();
        $model = Beneficiary::query();

        $param = explode(":", $value);

        $model->has('beneficiaryCreche')->whereHas('beneficiaryCreche.creche', function ($query) use ($user) {
            $query->where('center_id', $user->center_id);
        });

        ($param[0] == 'room_id' || $param[0] == 'degree_id' ? $model->whereHas('beneficiaryCreche.creche', function ($query) use ($param){
            $query->where($param[0],$param[1]);
        }): null);

        ($param[0] == 'status' ? $model->whereHas('beneficiaryCreche', function ($query) use ($param){
            $query->where('status',$param[1]);
        } ) : null);

        $query = $model->with('beneficiaryCreche.creche', 'beneficiaryCreche.creche.room', 'beneficiaryCreche.creche.degree')
            ->paginate(10);
        return response()->json($query);
    }

    public function searchValue($value)
    {
        $user = Auth::user();
        $model = Beneficiary::query();
        $query = $model->has('beneficiaryCreche')->whereHas('beneficiaryCreche.creche', function ($query) use ($user) {
            $query->where('center_id', $user->center_id);
        })
            ->with('beneficiaryCreche.creche', 'beneficiaryCreche.creche.room', 'beneficiaryCreche.creche.degree')
            ->paginate(10);
        return response()->json($query);
    }
}

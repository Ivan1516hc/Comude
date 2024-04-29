<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Aplicant;
use App\Models\BankAccount;
use App\Models\DocumentProcedure;
use App\Models\DocumentsRequest;
use App\Models\Log;
use App\Models\Procedure;
use App\Models\Requests;
use App\Models\StatusRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;

class RequestsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Necesitas loguearte', 'code' => 404]);
        }
        $model = Requests::query();

        // Las solicitudes deben de tener beneficiarios y se ordenan por edad los beneficiarios
        $query = $model->with(
            [
                'competition' => function ($query) {
                    $query->with(['competition_type:id,name', 'state:id,name', 'country:id,common_spa']);
                }, 'discipline', 'announcement', 'aplicant'
            ]
        )->where('status_request_id', '<>', 1)->paginate(10);

        return response()->json($query);
    }


    public function show($id)
    {
        $query = Requests::where('id', $id)->first();

        return response()->json($query);
    }

    public function showVisitorRequest()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'Necesitas loguearte', 'code' => 404]);
            }

            $requests = Requests::query()
                ->where('aplicant_id', $user->id)
                ->with([
                    'competition' => function ($query) {
                        $query->with(['competition_type:id,name', 'state:id,name', 'country:id,common_spa']);
                    },
                    'status_request:id,name',
                    'announcement:id,name',
                    'discipline:id,name',
                    'announcement.procedure'
                ])
                ->withCount('documents')
                ->orderBy('id', 'desc') // Ordenar por ID de forma ascendente
                ->paginate(5);


            // Verificar si el usuario tiene un registro en la tabla bank_accounts relacionada
            $hasBankAccount = !is_null($user->bank_account);


            if ($requests->isEmpty()) {
                return response()->json(['message' => 'No se encontraron solicitudes para este usuario.', 'code' => 404]);
            }

            return response()->json(['message' => 'Solicitudes recuperadas exitosamente.', 'code' => 200, 'data' => $requests, 'hasBankAccount' => $hasBankAccount]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'No se encontró el usuario.', 'code' => 404]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Error de validación: ' . $e->getMessage(), 'code' => 422]);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Error de base de datos: ' . $e->getMessage(), 'code' => 500]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ocurrió un error inesperado: ' . $e->getMessage(), 'code' => 500]);
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }




    public function showData($id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Necesitas loguearte', 'code' => 404]);
        }
        $request = Requests::find($id);
        if (!$request) {
            return response()->json(['message' => 'No existe la solicitud', 'code' => 202]);
        }
        DB::beginTransaction();
        $bankAccount = $this->getBankAccount($request->aplicant_id);
        $documents = $this->getDocument($id);
        $competition = $this->getCompetition($id);
        DB::commit();
        return response()->json(['bankAccount' => $bankAccount, 'documents' => $documents, 'competition' => $competition]);
    }

    protected function getBankAccount($id)
    {
        return  BankAccount::whereHas('aplicant', function ($query) use ($id) {
            $query->where('id', $id);
        })->first();
    }

    protected function getDocument($id)
    {
        return DocumentsRequest::where('request_id', $id)->with('document_procedure:id,name')->get();
        // return DocumentProcedure::with('document_procedure:id,name')->get();
    }
    public function getCompetition($id)
    {
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

        $aplicant = Aplicant::find($user->id);

        if (!$aplicant->phone_number || !$aplicant->birtdate || !$aplicant->name) {
            $response['message'] = "No tiene su perfil completo.";
            $response['code'] = 201;
            return response()->json($response);
        }
        $announcement = Announcement::where('status', 1)->first();
        if (!$announcement) {
            $response['message'] = "No hay convocatorias abiertas actualmente.";
            $response['code'] = 202;
            return response()->json($response);
        }

        $announcement = Announcement::where('status', 1)->first();
        if (!$announcement) {
            $response['message'] = "No hay convocatorias abiertas actualmente.";
            $response['code'] = 202;
            return response()->json($response);
        }

        $requests = Requests::where('announcement_id', $announcement->id)->where('aplicant_id', $user->id)->where('status_request_id', 1)->first();
        if ($requests) {
            $response['message'] = "Tienes una solicitud en proceso.";
            $response['code'] = 202;
            return response()->json($response);
        }


        DB::beginTransaction();
        try {
            $newRequestId = Requests::create([
                'announcement_id' => $announcement->id,
                'aplicant_id' => $user->id,
                'status_request_id' => 1,
                'discipline_id' => $request->discipline_id,
            ])->id;

            DB::commit();
            $response['message'] = "Solicitud iniciada.";
            $response['code'] = 200;
            $response['request_id'] = $newRequestId;
        } catch (\Throwable $th) {
            DB::rollBack();
            $response['message'] = "No se a podido iniciar la solicitud.";
            $response['code'] = 202;
        }
        return response()->json($response);
    }


    public function changeStatus(Request $request)
    {
        $query = Requests::find($request->request_id);
        if ($request->status_request_id == 9) {
            $query->update([
                'status_request_id' => $request->status_request_id
            ]);
            $query->update([
                'finished' => Carbon::now()
            ]);

            // // Enviar el correo electrónico utilizando la vista personalizada
            // $email = $query->user->email;
            // Mail::send('emails.send-request', [
            //     'name' => $query->user->name,
            //     'request' => $query
            // ], function (Message $message) use ($email) {
            //     $message->to($email)
            //         ->subject('Solicitud Enviada');
            // });

            //LOG PENDIENTE

            $response['code'] = 200;
            $response['message'] = "Solicitud terminada, sera revisada por los encargados de cada tramite, las actualizaciones importantes del estado de la solicituda llegaran al correo registrado.";
            return response()->json($response);
        } else if ($request->status_request_id == 6) {
            if ($query->status_request_id == 3) {
                $response['code'] = 200;
                $response['message'] = "La solicitud no se puede cancelar cuando ya fue aceptada.";
            }
            $query->update([
                'status_request_id' => $request->status_request_id
            ]);
            if ($query->status_request_id != 1) {
                $query->update([
                    'finished' => null
                ]);
            }

            //LOG PENDIENTE

            // Enviar el correo electrónico utilizando la vista personalizada
            $email = $query->user->email;
            $label = 'Solicitud No.' . $query->invoice . ' ha sido cancelada, los administradores del centro ' . $query->center_id . ' no podran ver mas tu solicitud.';
            $response['code'] = 200;
            $response['message'] = "Solicitud cancelada, los encargados del tramite no podran ver tu solicitud.";
        } else {
            $query->update([
                'status_request_id' => $request->status_request_id
            ]);
            $query->update([
                'finished' => null
            ]);
            // Enviar el correo electrónico utilizando la vista personalizada
            // $email = $query->user->email;
            $label = 'Solicitud No.' . $query->id . ' ha sido actualizada, los administradores del centro ' . $query->center_id . ' han cambiado el estado a ' . $query->status_request_id . '.';
            $response['code'] = 200;
            $response['message'] = "Actualizacion exitosa";
        }

        // Mail::send('emails.request-status-change', [
        //     'name' => $query->user->name,
        //     'request' => $query,
        //     'label' => $label
        // ], function (Message $message) use ($email) {
        //     $message->to($email)
        //         ->subject('Estado De Solicitud Actualizado');
        // });

        // Log::create([
        //     'user_id' => auth()->id(), // o null si el usuario no está autenticado
        //     'request_id' => $query->id,
        //     'action' => 'Solicitud actualizada',
        //     'description' => $label,
        //     'status' => 0,
        //     'read' => 0
        // ]);

        return response()->json($response);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Requests $requests)
    {
        //
    }

    public function updateStatus(Request $request)
    {
        $query = Requests::where('id', $request->id)->first();

        $statusAnterior = $query->status_request->name;

        $query->update([
            'status_request_id' => $request->status_request_id
        ]);

        $statusMessages = [
            2 => "Solicitud en Proceso.",
            3 => "Solicitud Aceptada",
            4 => "Solicitud Rechazada",
        ];

        $response = [
            'code' => 200,
            'message' => isset($statusMessages[$request->status_request_id])
                ? "Estatus Actualizado: " . $statusMessages[$request->status_request_id]
                : "Actualización exitosa"
        ];

        // $email = $query->user->email;

        $newStatus = StatusRequest::find($request->status_request_id);


        $label = 'Solicitud No.' . $query->id . ' ha sido actualizada, los administradores del trámite han cambiado el estado de "' . $statusAnterior . '" a "' . $newStatus->name . '".';

        // Mail::send('emails.request-status-change', [
        //     'name' => $query->user->name,
        //     'request' => $query,
        //     'label' => $label
        // ], function (Message $message) use ($email) {
        //     $message->to($email)
        //         ->subject('Estado De Solicitud Actualizado');
        // });

        // Log::create([
        //     'user_id' => auth()->id(), // o null si el usuario no está autenticado
        //     'receiver_id' => $query->user->id,
        //     'request_id' => $query->id,
        //     'action' => 'Solicitud actualizada',
        //     'description' => 'Solicitud con folio No.' . $query->invoice . ' actualizada, nuevo estado de solicitud ' . $newStatus->name . '.',
        //     'status' => 1,
        //     'read' => 0
        // ]);

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Requests $requests)
    {
        //
    }

    public function search($value)
    {
        $user = Auth::user();

        $param = explode(":", $value);

        // Usuarios con rol 1 no pueden consultar
        if ($user->role_id == 1) {
            return;
        }

        $model = Requests::query();

        // Roles admin centro y admin trámite solo pueden ver solicitudes de su trámite en específico
        if ($user->role_id == 2 || $user->role_id == 3) {
            $model->where('procedure_id', $user->department_id);
        }

        // No se muestran las solicitudes sin terminar o canceladas
        $model->whereNotIn('status_request_id', [1, 6]);

        // Mostrar las solicitudes de modificación
        $model->with('modify_forms');

        // Admin de centro, solo ver solicitudes de su centro
        if ($user->role_id == 2) {
            $model->where('center_id', $user->center_id);
        }

        // Si el usuario corresponde a NIDOS, la solicitud debe de estar aplicando a una guardería
        if ($user->department_id == 1 || $user->department_id == 2) {
            $model->has('crecheRequest')->with('crecheRequest.degree');
        }

        ($param[0] == 'status' ? $model->where('status_request_id', $param[1]) : null);
        // Las solicitudes deben de tener beneficiarios y se ordenan por edad los beneficiarios
        $model->has('beneficiaries')->orderBy('id', 'asc')->with(['beneficiaries' => function ($query) {
            $query->orderBy('id', 'asc');
        }])->with('priority');

        if ($param[0] == 'quote') {
            ($param[1] == 1 ? $model->whereHas('quotes', function ($query) {
                $query->whereNotNull('id');
            }) : $model->doesntHave('quotes'));
        }

        $query = $model->withCount('quotes')->paginate(10);

        return response()->json($query);
    }

    public function searchValue($value)
    {
        $user = Auth::user();

        // Usuarios con rol 1 no pueden consultar
        if ($user->role_id == 1) {
            return;
        }

        $model = Requests::query();

        // Roles admin centro y admin trámite solo pueden ver solicitudes de su trámite en específico
        if ($user->role_id == 2 || $user->role_id == 3) {
            $model->where('procedure_id', $user->department_id);
        }

        // No se muestran las solicitudes sin terminar o canceladas
        $model->whereNotIn('status_request_id', [1, 6]);

        // Mostrar las solicitudes de modificación
        $model->with('modify_forms');

        // Admin de centro, solo ver solicitudes de su centro
        if ($user->role_id == 2) {
            $model->where('center_id', $user->center_id);
        }

        // Si el usuario corresponde a NIDOS, la solicitud debe de estar aplicando a una guardería
        if ($user->department_id == 1 || $user->department_id == 2) {
            $model->has('crecheRequest')->with('crecheRequest.degree');
        }

        $model->has('beneficiaries')->orderBy('id', 'asc')->with(['beneficiaries' => function ($query) {
            $query->orderBy('id', 'asc');
        }])->with('priority');

        //REALIZAR BUSQUEDA 
        $query = $model->where(function ($query) use ($value) {
            $query->where('invoice', 'like', '%' . $value . '%')
                ->orWhereHas('beneficiaries', function ($query) use ($value) {
                    $query->whereRaw("CONCAT(nombre, ' ', apaterno, ' ', amaterno) LIKE ?", ['%' . $value . '%']);
                });
        })
            ->withCount('quotes')
            ->paginate(10);

        return response()->json($query);
    }
}

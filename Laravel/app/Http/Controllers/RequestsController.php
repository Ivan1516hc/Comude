<?php

namespace App\Http\Controllers;

use App\Exports\ComiteExport;
use App\Models\Announcement;
use App\Models\Aplicant;
use App\Models\BankAccount;
use App\Models\CancelHistoryRequest;
use App\Models\Competition;
use App\Models\DocumentModify;
use App\Models\DocumentsRequest;
use App\Models\ImportantArchievement;
use App\Models\ModifyForm;
use App\Models\RequestJustification;
use App\Models\Requests;
use App\Models\StatusRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;

class RequestsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::guard('user')->user();
        if (!$user) {
            return response()->json(['message' => 'Necesitas loguearte', 'code' => 404]);
        }
        $model = Requests::query();

        $query = $model->with(
            [
                'competition' => function ($query) {
                    $query->with(['competition_type:id,name', 'state:id,name', 'country:id,common_spa']);
                }, 'discipline', 'announcement', 'aplicant'
            ]
        )->whereIn('status_request_id', [4, 2, 7])->paginate(10);

        return response()->json($query);
    }

    public function showAppraisal()
    {
        $user = Auth::guard('user')->user();
        if (!$user) {
            return response()->json(['message' => 'Necesitas loguearte', 'code' => 404]);
        }
        $model = Requests::query();

        $query = $model->with(
            [
                'competition' => function ($query) {
                    $query->with(['competition_type:id,name', 'state:id,name', 'country:id,common_spa']);
                }, 'discipline', 'announcement', 'aplicant'
            ]
        )->whereIn('status_request_id', [3])
            ->paginate(10);

        return response()->json($query);
    }

    public function showHistorical($dateStart = null, $dateEnd = null, $exportExcel = null)
    {
        $user = Auth::guard('user')->user();
        if (!$user) {
            return response()->json(['message' => 'Necesitas loguearte', 'code' => 404]);
        }
        $model = Requests::query();

        $query = $model->with(
            [
                'competition' => function ($query) {
                    $query->with(['competition_type:id,name', 'state:id,name', 'country:id,common_spa']);
                }, 'discipline', 'status_request:id,name', 'announcement', 'aplicant'
            ]
        )->where('status_request_id', '<>', 6)->where('status_request_id', '<>', 1);

        if ($dateStart && $dateEnd && $dateStart != 'null' && $dateEnd != 'null') {
            $query = $query->whereBetween('finished', [$dateStart, $dateEnd]);
        }

        if ($exportExcel && $exportExcel != 'null') {
            $requests = $query->with([
                'aplicant' => function ($query) {
                    $query->withCount([
                        'requests as accepted_requests_count' => function ($query) {
                            $query->where('status_request_id', 5)->whereYear('finished', date('Y'));
                        },
                        'requests as other_requests_count' => function ($query) {
                            $query->where('status_request_id', '<>', 1)
                                ->where('status_request_id', '<>', 6)
                                ->whereYear('finished', date('Y'));
                        }
                    ]);
                }
            ])->where('status_request_id', '<>', 1)->get();

            $requests->each(function ($request) {
                $approvedBudgetSum = $request->aplicant->requests()
                    ->where('status_request_id', 5)
                    ->with('competition')
                    ->get()
                    ->sum(function ($request) {
                        return $request->competition->approved_budget;
                    });
                $request->aplicant->approved_budget_sum = $approvedBudgetSum;
            });

            $totalCost = $requests->sum('competition.requested_budget');
            if ($dateStart && $dateEnd && $dateStart != 'null' && $dateEnd != 'null') {
                $begin = Carbon::createFromFormat('Y-m-d', $dateStart);
                $finish = Carbon::createFromFormat('Y-m-d', $dateEnd);

                $beginFormatted = $begin->format('d/m/Y');
                $finishFormatted = $finish->format('d/m/Y');
            } else {
                $beginFormatted = Carbon::now()->format('d/m/Y');
                $finishFormatted = Carbon::now()->format('d/m/Y');
            }
            return Excel::download(new ComiteExport($requests, $totalCost, $beginFormatted, $finishFormatted), 'reporte-comite.xlsx');
        }

        $query = $query->where('status_request_id', '<>', 1)
            ->paginate(10);

        return response()->json($query);
    }


    public function show($id)
    {
        $query = Requests::with('modify_forms.form')->where('id', $id)->first();

        return response()->json($query);
    }

    public function showVisitorRequest()
    {
        try {
            $user = Auth::guard('aplicant')->user();
            if (!$user) {
                return response()->json(['message' => 'Necesitas loguearte', 'code' => 404]);
            }

            $requests = Requests::query()
                ->where('aplicant_id', $user->id)
                ->with([
                    'competition' => function ($query) {
                        $query->with(['competition_type:id,name', 'state:id,name', 'country:id,common_spa']);
                    },
                    'bank_account',
                    'status_request:id,name',
                    'announcement:id,name',
                    'discipline:id,name',
                    'announcement.procedure',
                    'modify_forms.form:id,name',
                    'modify_forms' => function ($query) {
                        $query->where('status', 0)->with(['form:id,name', 'document_modify' => function ($query) {
                            $query->with('document_procedure:id,name');
                        }]);
                    },
                ])
                ->withCount('documents')
                ->orderBy('id', 'desc') // Ordenar por ID de forma ascendente
                ->paginate(5);


            // Verificar si el usuario tiene un registro en la tabla bank_accounts relacionada
            $hasImportantArchievements = !$user->important_archievements->isEmpty();

            if ($requests->isEmpty()) {
                return response()->json(['message' => 'No se encontraron solicitudes para este usuario.', 'code' => 404, 'readRegulations' => $user->read_regulations, 'hasImportantArchievements' => $hasImportantArchievements]);
            }

            return response()->json(['message' => 'Solicitudes recuperadas exitosamente.', 'code' => 200, 'data' => $requests, 'readRegulations' => $user->read_regulations, 'hasImportantArchievements' => $hasImportantArchievements]);
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
        $user = Auth::guard('user')->user();
        if (!$user) {
            return response()->json(['message' => 'Necesitas loguearte', 'code' => 404]);
        }
        $request = Requests::find($id);
        if (!$request) {
            return response()->json(['message' => 'No existe la solicitud', 'code' => 202]);
        }
        DB::beginTransaction();
        $bankAccount = $this->getBankAccount($id);
        $documents = $this->getDocument($id);
        $competition = $this->getCompetition($id);
        $general = $this->getGeneral($id);
        $imprtantArchievements = ImportantArchievement::where('aplicant_id', $request->aplicant_id)->get();
        $documentJustification = RequestJustification::where('request_id', $id)->with('justificationType')->get();
        DB::commit();
        return response()->json(['bankAccount' => $bankAccount, 'documents' => $documents, 'competition' => $competition, 'general' => $general, 'imprtantArchievements' => $imprtantArchievements, 'documentJustification' => $documentJustification]);
    }

    protected function getBankAccount($id)
    {
        return  BankAccount::whereHas('request', function ($query) use ($id) {
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
        return Competition::whereHas('request', function ($query) use ($id) {
            $query->where('id', $id);
        })->with('competition_type:id,name', 'state:id,name', 'country:id,common_spa')->first();
    }

    public function getGeneral($id)
    {
        return Requests::where('id', $id)->with('discipline', 'aplicant:id,name,phone_number,email,birtdate,curp', 'status_request:id,name', 'reason_decline')->first();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::guard('aplicant')->user();

        if (!$user) {
            $response['message'] = "Necesitas loguearte";
            $response['code'] = 404;
            return response()->json($response);
        }

        $aplicant = Aplicant::with('important_archievements')->find($user->id);

        if (!$aplicant->phone_number || !$aplicant->birtdate || !$aplicant->name || $aplicant->important_archievements->isEmpty()) {
            $response['message'] = "No tiene su perfil completo.";
            $response['code'] = 201;
            return response()->json($response);
        }

        if ($aplicant->requests()->where('status_request_id', 5)->whereYear('finished', date('Y'))->count() >= 5) {
            $response['message'] = "Ya tienes 5 solicitudes aceptadas en este año.";
            $response['code'] = 201;
            return response()->json($response);
        }

        if ($aplicant->requests()->where('status_request_id', 1)->count() > 0) {
            $response['message'] = "Tienes una solicitud en proceso.";
            $response['code'] = 201;
            return response()->json($response);
        }
        // Suponiendo que $aplicant es una instancia del modelo Applicant
        // if (
        //     $aplicant->requests()->where('status_request_id', 5)
        //     ->whereHas('competition', function ($query) {
        //         $query->whereDate('end_date', '<=', Carbon::now()->subDays(30));
        //     })->count() > 0
        // ) {
        //     $response['message'] = "Tienes una solicitud sin justificar.";
        //     $response['code'] = 201;
        //     return response()->json($response);
        // }


        $announcement = Announcement::where('status', 1)->first();
        if (!$announcement) {
            $response['message'] = "No hay convocatorias abiertas actualmente.";
            $response['code'] = 202;
            return response()->json($response);
        }

        DB::beginTransaction();
        try {
            $newRequestId = Requests::create([
                'announcement_id' => $announcement->id,
                'aplicant_id' => $user->id,
                'modality' => $request->modality,
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
        // return response()->json(Auth::guard('aplicant')->user());
        $query = Requests::find($request->request_id);
        $year = Carbon::now()->format('Y');
        if ($request->status_request_id == 2) {
            DB::beginTransaction();
            try {
                if (!$query->invoice) {
                    $number = Requests::select('invoice')->where('invoice', 'like', 'BECA' . $year . '%')->whereYear('created_at', $year)->orderBy('invoice', 'desc')->get()->count();

                    if ($number > 0) {
                        $folio = 'BECA' . $year . '-' . str_pad($number + 1, 4, '0', STR_PAD_LEFT);
                    } else {
                        $folio = 'BECA' . $year . '-0001';
                    }

                    $query->update([
                        'invoice' => $folio,
                        'finished' => Carbon::now()
                    ]);
                }
                $query->update([
                    'status_request_id' => $request->status_request_id
                ]);
                DB::commit();
                $user = Auth::guard('aplicant')->user();

                Mail::send('emails.request-sent', [
                    'name' => $user->name,
                    'invoice' => $folio,
                    'competition' => $query->competition,
                ], function (Message $message) use ($user) {
                    $message->to($user->email)
                        ->subject('Solicitud de beca deportiva recibida');
                });

                $response['code'] = 200;
                $response['message'] = "La solicitud se ha enviado correctamente.";
            } catch (\Throwable $th) {
                DB::rollBack();
                $response['message'] = "No se a podido enviar la solicitud.";
                $response['code'] = 202;
            }
        } else if ($request->status_request_id == 6) {
            if ($query->status_request_id != 1) {
                $response['code'] = 200;
                $response['message'] = "La solicitud no se puede cancelar cuando ya fue enviada.";
            } else {
                $query->update([
                    'status_request_id' => $request->status_request_id
                ]);
                if ($query->status_request_id != 1) {
                    $query->update([
                        'finished' => null
                    ]);
                }
                $response['code'] = 200;
                $response['message'] = "Solicitud cancelada, los encargados del trámite no podrán ver tu solicitud.";
            }
        } else {
            $query->update([
                'status_request_id' => $request->status_request_id
            ]);
            $query->update([
                'finished' => null
            ]);

            $response['code'] = 200;
            $response['message'] = "Actualización exitosa";
        }
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
        $user = $query->aplicant;
        $query->update([
            'status_request_id' => $request->status_request_id
        ]);

        if ($request->status_request_id == 7) {
            CancelHistoryRequest::create([
                'request_id' => $request->id,
                'reason' => $request->reason
            ]);

            Mail::send('emails.cancel-request', [
                'name' => $user->name,
                'invoice' => $query->invoice,
                'competition' => $query->competition,
                'reason' => $request->reason
            ], function (Message $message) use ($user) {
                $message->to($user->email)
                    ->subject('Solicitud rechazada');
            });
        }

        if ($request->status_request_id == 2) {
            CancelHistoryRequest::where('request_id', $request->id)->delete();
        }

        $statusMessages = [
            3 => "Solicitud en Proceso.",
            5 => "Solicitud Aceptada",
            7 => "Solicitud Rechazada",
        ];

        $response = [
            'code' => 200,
            'message' => isset($statusMessages[$request->status_request_id])
                ? "Estatus Actualizado: " . $statusMessages[$request->status_request_id]
                : "Actualización exitosa"
        ];

        // $email = $query->user->email;

        $newStatus = StatusRequest::find($request->status_request_id);

        if ($request->status_request_id == 3) {
            Mail::send('emails.revised-request', [
                'name' => $user->name,
                'invoice' => $query->invoice,
                'competition' => $query->competition,
            ], function (Message $message) use ($user) {
                $message->to($user->email)
                    ->subject('Documentación completa y revisada');
            });
        }

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Requests $requests)
    {
        //
    }

    public function search($value, $dateStart = null, $dateEnd = null, $exportExcel)
    {
        $user = Auth::guard('user')->user();

        $param = explode(":", $value);

        // Usuarios con rol 1 no pueden consultar
        if (!$user) {
            return;
        }

        $model = Requests::query();

        // No se muestran las solicitudes sin terminar o canceladas
        $model->whereNotIn('status_request_id', [1, 6]);

        if ($dateStart && $dateEnd && $dateStart != 'null' && $dateEnd != 'null') {
            $model->whereBetween('finished', [$dateStart, $dateEnd]);
        }
        // Mostrar las solicitudes de modificación
        $model->with('modify_forms');


        ($param[0] == 'status' ? $model->where('status_request_id', $param[1]) : null);

        $query = $model->with(
            [
                'competition' => function ($query) {
                    $query->with(['competition_type:id,name', 'state:id,name', 'country:id,common_spa']);
                }, 'discipline', 'announcement', 'aplicant'
            ]
        );
        if ($exportExcel && $exportExcel != 'null') {
            $requests = $query->with([
                'aplicant' => function ($query) {
                    $query->withCount([
                        'requests as accepted_requests_count' => function ($query) {
                            $query->where('status_request_id', 5)->whereYear('finished', date('Y'));
                        },
                        'requests as other_requests_count' => function ($query) {
                            $query->where('status_request_id', '<>', 1)
                                ->where('status_request_id', '<>', 6)
                                ->whereYear('finished', date('Y'));
                        }
                    ]);
                }
            ])->get();
            $requests->each(function ($request) {
                $approvedBudgetSum = $request->aplicant->requests()
                    ->where('status_request_id', 5)
                    ->with('competition')
                    ->get()
                    ->sum(function ($request) {
                        return $request->competition->approved_budget;
                    });
                $request->aplicant->approved_budget_sum = $approvedBudgetSum;
            });

            $totalCost = $requests->sum('competition.requested_budget');
            if ($dateStart && $dateEnd && $dateStart != 'null' && $dateEnd != 'null') {
                $begin = Carbon::createFromFormat('Y-m-d', $dateStart);
                $finish = Carbon::createFromFormat('Y-m-d', $dateEnd);

                $beginFormatted = $begin->format('d/m/Y');
                $finishFormatted = $finish->format('d/m/Y');
            } else {
                $beginFormatted = Carbon::now()->format('d/m/Y');
                $finishFormatted = Carbon::now()->format('d/m/Y');
            }
            return Excel::download(new ComiteExport($requests, $totalCost, $beginFormatted, $finishFormatted), 'reporte-comite.xlsx');
        }
        $query = $query->paginate(10);

        return response()->json($query);
    }

    public function searchValueValidation($value)
    {
        $user = Auth::guard('user')->user();

        if (!$user) {
            return;
        }

        $model = Requests::query();

        // No se muestran las solicitudes sin terminar o canceladas
        $model->whereNotIn('status_request_id', [1, 6, 3, 5, 8]);

        // Mostrar las solicitudes de modificación
        $model->with([
            'competition' => function ($query) {
                $query->with(['competition_type:id,name', 'state:id,name', 'country:id,common_spa']);
            }, 'discipline', 'announcement', 'aplicant', 'modify_forms'
        ]);

        //REALIZAR BUSQUEDA 
        $query = $model->where(function ($query) use ($value) {
            $query->where('invoice', 'like', '%' . $value . '%');

            $query->orWhereHas('aplicant', function ($query) use ($value) {
                $query->where('name', 'like', '%' . $value . '%');
            });

            $query->orWhereHas('competition.competition_type', function ($query) use ($value) {
                $query->where('name', 'like', '%' . $value . '%');
            });

            $query->orWhereHas('discipline', function ($query) use ($value) {
                $query->where('name', 'like', '%' . $value . '%');
            });
        })
            ->paginate(10);


        return response()->json($query);
    }


    public function searchValueAppraisal($value)
    {
        $user = Auth::guard('user')->user();

        if (!$user) {
            return;
        }

        $model = Requests::query();

        // No se muestran las solicitudes sin terminar o canceladas
        $model->whereIn('status_request_id', [3, 7]);

        // Mostrar las solicitudes de modificación
        $model->with([
            'competition' => function ($query) {
                $query->with(['competition_type:id,name', 'state:id,name', 'country:id,common_spa']);
            }, 'discipline', 'announcement', 'aplicant', 'modify_forms'
        ]);

        //REALIZAR BUSQUEDA 
        $query = $model->where(function ($query) use ($value) {
            $query->where('invoice', 'like', '%' . $value . '%');

            $query->orWhereHas('aplicant', function ($query) use ($value) {
                $query->where('name', 'like', '%' . $value . '%');
            });

            $query->orWhereHas('competition.competition_type', function ($query) use ($value) {
                $query->where('name', 'like', '%' . $value . '%');
            });

            $query->orWhereHas('discipline', function ($query) use ($value) {
                $query->where('name', 'like', '%' . $value . '%');
            });
        })
            ->paginate(10);


        return response()->json($query);
    }

    public function verifyUpdate($id, $form)
    {
        $request = ModifyForm::where('request_id', $id)->where('form_id', $form)->where('status', 0)->with('document_modify')->get();

        return response()->json($request);
    }

    public function verifyUpdateDocument($id)
    {
        $request = DocumentModify::whereHas('modify_form', function ($query) use ($id) {
            $query->where('request_id', $id)->where('status', 0);
        })->get();

        return response()->json($request);
    }

    public function sendMessageJustificacion($id)
    {
        $request = Requests::find($id);
        $user = $request->aplicant;
        Mail::send('emails.justification', [
            'name' => $user->name,
            'invoice' => $request->invoice,
            'competition' => $request->competition->name,
        ], function (Message $message) use ($user) {
            $message->to($user->email)
                ->subject('Necesario realizar la comprobación de la beca recibida');
        });

        return response()->json(['message' => 'Correo enviado correctamente', 'code' => 200]);
    }
}

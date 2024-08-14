<?php

namespace App\Http\Controllers\Mails;

use App\Http\Controllers\Controller;
use App\Models\DocumentModify;
use App\Models\DocumentProcedure;
use App\Models\Form;
use App\Models\HistoryMessage;
use App\Models\Log;
use App\Models\MessageMotive;
use App\Models\ModifyForm;
use App\Models\Requests;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class MessageRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::guard('user')->user();
        $message_motive = MessageMotive::all();
        if ($user->role_id == 1) {
            return;
        }
        $model = HistoryMessage::query();
        // $model->where('procedure_id', $user->department_id)->where('status','<>',0);
        ($user->role_id == 2 ? $model->whereHas('request', function ($query) use ($user) {
            $query->where(['request.procedure_id' => $user->departament_id, 'request.center_id' => $user->center_id]);
        }) : null);

        $query = $model->with('request', 'user', 'message_motive')->get();
        return response()->json($query, $message_motive);
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
        $user = Auth::guard('user')->user();


        try {
            DB::beginTransaction();

            $body = $request->all();

            $request = Requests::find($body['request_id']);
            $motivo = MessageMotive::find($body['message_motive_id']);
            $form = Form::find($body['form_id']);
            $email = $request->aplicant->email;

            if ($body['message_motive_id'] != 4) {
                Mail::send('emails.message-request', [
                    'name' => $request->aplicant->name,
                    'request' => $request,
                    'text' => $body['message'],
                    'motivo' => $motivo
                ], function (Message $message) use ($email) {
                    $message->to($email)
                        ->subject('COMUDE Zapopan');
                });
            }

            $history = HistoryMessage::create([
                'text' => $body['message'],
                'message_motive_id' => $body['message_motive_id'],
                'user_id' => $user->id,
                'request_id' => $body['request_id'],
            ]);

            // Log::create([
            //     'user_id' => auth()->id(), // o null si el usuario no está autenticado
            //     'receiver_id' => $request->user->id,
            //     'request_id' => $request->id,
            //     'action' => 'Mensaje enviado',
            //     'description' => 'Mensaje enviado a la solicitud con folio No.' . $request->invoice . ' por motivo de ' . $motivo->name . '.',
            //     'status' => 1,
            //     'read' => 0,
            // ]);

            if ($body['message_motive_id'] == 4) {
                $modifyForm = ModifyForm::create([
                    'request_id' => $request->id,
                    'form_id' => $body['form_id'],
                    'motive' => $body['message'],
                    'history_message_id' => $history->id,
                ])->id;

                if ($body['form_id'] == 3) {
                    DocumentModify::create([
                        'modify_form_id' => $modifyForm,
                        'document_procedure_id' => $body['document_procedure_id']
                    ]);
                }

                $request->update([
                    'status_request_id' => 4
                ]);

                Mail::send('emails.modify-form', [
                    'name' => $request->aplicant->name,
                    'invoice' => $request->invoice,
                    'form' => $form->name,
                    'document'  => $form->id == 3 ? DocumentProcedure::find($body['document_procedure_id'])->name : null,
                    'text' => $body['message'],
                    'competition' => $request->competition
                ], function (Message $message) use ($email) {
                    $message->to($email)
                        ->subject('COMUDE Zapopan');
                });
            }

            DB::commit();

            $response['message'] = "Mensaje enviado correctamente.";
            $response['code'] = 200;

            return response()->json($response);
        } catch (\Exception $e) {
            DB::rollBack();
            // Maneja la excepción (puede ser un problema de concurrencia)
            // Log, notifica, etc.
            return response()->json(['code' => 201, 'message' => 'No se ha podido enviar el correo. ' . $e]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = Auth::guard('user')->user();
        $message_motive = MessageMotive::all();


        $model = HistoryMessage::query();

        $model->whereHas('request', function ($query) use ($id) {
            $query->where(['id' => $id]);
        });

        $data = $model->with('request', 'user', 'message_motive')->get();

        $response = [
            'data' => $data,
            'message_motive' => $message_motive,
        ];

        return response()->json($response, 200);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HistoryMessage $historyMessage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $query = HistoryMessage::find($request->id);
        $query->update([
            'attended' => $request->attended
        ]);

        if ($request->attended == 1) {

            $response['code'] = 200;
            $response['message'] = "Asistencia registrada correctamente.";
        } elseif ($request->attended == 0) {

            $response['code'] = 200;
            $response['message'] = "Falta registrada correctamente.";
        }

        $email = $query->request->user->email;
        $label = 'La cita del día ' . $query->date . ' a las ' . $query->hour . ' hrs. de la solicitud No.' . $request->invoice . '.';
        $cita = 'El estado registrado en la cita es: "' . ($query->attended == 2 ? 'PENDIENTE A ASISTIR' : ($query->attended == 1 ? 'ASISTIO' : 'NO ASISTIO')) . '".';

        Mail::send('emails.attendance-record', [
            'name' => $query->request->user->name,
            'request' => $query,
            'label' => $label,
            'quote' => $cita
        ], function (Message $message) use ($email) {
            $message->to($email)
                ->subject('Estado De Solicitud Actualizado');
        });

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
    }

    public function typeForm()
    {
        $query = Form::all();
        $document = DocumentProcedure::all();

        return response()->json(['forms' => $query, 'type_documents' => $document]);
    }
}

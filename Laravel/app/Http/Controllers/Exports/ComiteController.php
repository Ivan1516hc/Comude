<?php

namespace App\Http\Controllers\Exports;

use App\Exports\ComiteExport;
use App\Http\Controllers\Controller;
use App\Models\Competition;
use App\Models\Requests;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class ComiteController extends Controller
{
    public function comiteExport(Request $request)
    {
        $user = Auth::guard('user')->user();
        if (!$user) {
            return response()->json(['message' => 'No autorizado'], 401);
        }

        $model = Requests::query();
        $begin = $request->begin;
        $finish = $request->finish;

        $requests = $model->whereDate('created_at', '>=', $begin)->whereDate('created_at', '<=', $finish)->with(
            [
                'competition' => function ($query) {
                    $query->with(['competition_type:id,name', 'state:id,name', 'country:id,common_spa']);
                }, 'discipline', 'status_request:id,name', 'announcement', 'aplicant'
            ]
        )->whereNotIn('status_request_id', [1, 4])->limit(1000)->orderBy('id', 'desc')->get();


        $totalCost = $requests->sum('competition.requested_budget');

        $begin = Carbon::createFromFormat('Y-m-d', $begin);
        $finish = Carbon::createFromFormat('Y-m-d', $finish);

        $beginFormatted = $begin->format('d/m/Y');
        $finishFormatted = $finish->format('d/m/Y');

        // return response()->json(['solicitudes' => $requests, 'total' => $totalCost], 200);

        return Excel::download(new ComiteExport($requests, $totalCost, $beginFormatted, $finishFormatted), 'reporte-comite.xlsx');
    }

    public function assignmentComite(Request $request)
    {
        $user = Auth::guard('user')->user();
        if (!$user) {
            return response()->json(['message' => 'No autorizado', 'code' => 401]);
        }

        $competition = Competition::whereHas('request', function ($query) use ($request) {
            $query->where('invoice', $request->invoice);
        })->first();
        $requests = Requests::where('invoice', $request->invoice)->first();

        $competition->approved_budget = $request->approved_budget;
        $requests->status_request_id = 5;
        $requests->save();
        $competition->save();

        return response()->json(['message' => 'Presupuesto aprobado registrado correctamente para la solicitud '.$requests->invoice.'', 'code' => 200]);
    }

    public function comiteImport(Request $request)
    {
        $user = Auth::guard('user')->user();
        if (!$user) {
            return response()->json(['message' => 'No autorizado', 'code' => 401]);
        }

        $valores = $request->all();
        $datos_actualizados = [];
        foreach ($valores as $key => $registro) {
            if ($registro['confirmed'] == true) {
                $competition = Competition::whereHas('request', function ($query) use ($registro) {
                    $query->where('invoice', $registro['folio']);
                })->first();
                $requests = Requests::where('invoice', $registro['folio'])->first();

                if (!$competition || !$requests || $competition->approved_budget != null || $requests->status_request_id == 1) {
                    $errorMessage = 'Datos inválidos, error en el folio ' . $registro['folio'] . '.';
                    if (!$requests) {
                        $errorMessage .= ' No se encuentra una solicitud con ese folio.';
                    } else if ($competition->approved_budget != null) {
                        $errorMessage .= ' La solicitud ya tiene un monto aprobado.';
                    } else if ($requests->status_request_id != 3) {
                        $errorMessage .= ' La solicitud no está en estado "Pendiente".';
                    } else if (!$competition) {
                        $errorMessage .= ' Falta información de la competencia de la solicitud.';
                    } else {
                        $errorMessage .= ' Error no identificado, verifica los datos de la solicitud.';
                    }
                    // Reindexar el arreglo después de eliminar el elemento
                    $valores = array_values($valores);
                    return response()->json(['message' => $errorMessage, 'code' => 400, 'datos_actualizados' => $datos_actualizados, 'valores' => $valores]);
                }

                $competition->approved_budget = $registro['monto_aprobado'];
                $requests->status_request_id = 5;
                $requests->save();
                $competition->save();

                $datos_actualizados[] = [
                    'folio' => $registro['folio'],
                    'monto_aprobado' => $registro['monto_aprobado']
                ];
                unset($valores[$key]);
            }
        }
        // Reindexar el arreglo después de eliminar el elemento
        $valores = array_values($valores);

        return response()->json(['message' => 'Importación exitosa', 'code' => 200, 'datos_actualizados' => $datos_actualizados, 'valores' => $valores], 200);
    }
}

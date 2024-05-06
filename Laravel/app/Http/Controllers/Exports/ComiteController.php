<?php

namespace App\Http\Controllers\Exports;

use App\Exports\ComiteExport;
use App\Http\Controllers\Controller;
use App\Models\Requests;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class ComiteController extends Controller
{
    public function comiteExport(Request $request)
    {
        $user = Auth::user();
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
}

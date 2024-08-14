<?php

namespace App\Http\Controllers;

use App\Models\Aplicant;
use App\Models\HistoryMessage;
use App\Models\Requests;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function getCountRequest($status, $date)
    {
        $query = Requests::query();
        $query->where('status_request_id', $status);

        // Obtener la fecha actual
        $now = Carbon::now();

        if ($date == 1) {
            // Filtro para la semana actual
            $query->whereBetween('finished', [
                $now->startOfWeek()->format('Y-m-d H:i:s'),
                $now->endOfWeek()->format('Y-m-d H:i:s')
            ]);
        } elseif ($date == 2) {
            // Filtro para el mes actual
            $query->whereYear('finished', $now->year)
                ->whereMonth('finished', $now->month);
        } elseif ($date == 3) {
            // Filtro para el año actual
            $query->whereYear('finished', $now->year);
        }

        $count = $query->count();
        return response()->json($count);
    }

    public function getCountBeneficiary($date)
    {
        // Obtener la fecha actual
        $now = Carbon::now();
        $query = Aplicant::query();

        if ($date == 1) {
            // Filtro para la semana actual
            $query->whereHas('requests', function ($query) use ($now) {
                $query->where('status_request_id', 5)->whereBetween('finished', [
                    $now->startOfWeek()->format('Y-m-d H:i:s'),
                    $now->endOfWeek()->format('Y-m-d H:i:s')
                ]);
            });
        } elseif ($date == 2) {
            // Filtro para el mes actual
            $query->whereHas('requests', function ($query) use ($now) {
                $query->where('status_request_id', 5)->whereYear('finished', $now->year)
                    ->whereMonth('finished', $now->month);
            });
        } elseif ($date == 3) {
            // Filtro para el año actual
            $query->whereHas('requests', function ($query) use ($now) {
                $query->where('status_request_id', 5)->whereYear('finished', $now->year);
            });
        }
        $count = $query->count();
        return response()->json($count);
    }

    public function getHistoryMessages()
    {
        $user = Auth::guard('user')->user();
        $query = HistoryMessage::where('user_id', $user->id)->with('message_motive')->orderBy('id', 'desc')->paginate(10);
        return response()->json($query);
    }
}

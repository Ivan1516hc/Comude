<?php

namespace App\Http\Controllers\SportProcedure;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use App\Models\ModifyForm;
use App\Models\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CompetitionController extends Controller
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
        $user = Auth::guard('aplicant')->user();
        if (!$user) {
            $response['message'] = "Necesitas loguearte";
            $response['code'] = 404;
            return response()->json($response);
        }

        $requests = Requests::find($request->request_id);

        if (!$requests) {
            $response['message'] = "Solicitud no encontrada, intenta de nuevo.";
            $response['code'] = 202;
            return response()->json($response);
        }

        DB::beginTransaction();
        try {
            $newIdCompetition = Competition::create($request->all())->id;
            $requests->update([
                'competition_id' => $newIdCompetition
            ]);

            DB::commit();
            $response['message'] = "Información de competencia registrada correctamente.";
            $response['code'] = 200;
        } catch (\Throwable $th) {
            DB::rollBack();
            $response['message'] = "No se a podido registrar la información.";
            $response['code'] = 202;
        }
        return response()->json($response);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = Auth::guard('aplicant')->user();
        if (!$user) {
            $response['message'] = "Necesitas loguearte";
            $response['code'] = 404;
            return response()->json($response);
        }

        $model = Competition::query();

        $model->whereHas('request', function ($query) use ($id) {
            $query->where('id', $id);
        })->with('state', 'competition_type', 'country');

        $query = $model->first();

        return response()->json($query);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Competition $competition)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = Auth::guard('aplicant')->user();
        if (!$user) {
            $response['message'] = "Necesitas loguearte";
            $response['code'] = 404;
            return response()->json($response);
        }

        $requests = Requests::find($request->request_id);

        if (!$requests) {
            $response['message'] = "Solicitud no encontrada, intenta de nuevo.";
            $response['code'] = 202;
            return response()->json($response);
        }

        DB::beginTransaction();
        try {
            Competition::find($requests->competition_id)->update($request->all());

            if($requests->status_request_id == 4){
                ModifyForm::where(['request_id' => $requests->id, 'form_id' => 1])->update([
                    'status' => 1
                ]);
                if(ModifyForm::where(['request_id' => $requests->id , 'status' => 0])->count() == 0){
                    $requests->update([
                        'status_request_id' => 2
                    ]);
                }
            }

            DB::commit();
            $response['message'] = "Información de competencia actualizada correctamente.";
            $response['code'] = 200;
        } catch (\Throwable $th) {
            DB::rollBack();
            $response['message'] = "No se a podido actualizar la información.";
            $response['code'] = 202;
        }
        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Competition $competition)
    {
        //
    }
}

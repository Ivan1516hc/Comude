<?php

namespace App\Http\Controllers\Catalogs;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use App\Models\CompetitionType;
use App\Models\Countries;
use App\Models\CountriesStates;
use App\Models\Discipline;
use Illuminate\Http\Request;


class CatalogController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getDataDiscipline(){
        $competitions = Discipline::all();
        // $disciplines = Discipline::all();

        return response()->json(['disciplines' => $competitions]);
    }

    public function getDataCompetition(){
        $conpetition_types = CompetitionType::all();
        $countries = Countries::all();
        
        return response()->json(['countries' => $countries,'conpetition_types' => $conpetition_types]);
    }

    public function getDataCountryStates($id){
        $country_states = CountriesStates::where('country_id', $id)->get();
        return response()->json($country_states);
    }
}

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

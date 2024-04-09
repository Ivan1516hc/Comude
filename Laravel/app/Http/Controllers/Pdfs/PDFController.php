<?php

namespace App\Http\Controllers;

use App\Models\ReferencesRequest;
use App\Models\Requests;
use Barryvdh\DomPDF\Facade\Pdf;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;

// use Barryvdh\DomPDF\PDF;

class PDFController extends Controller
{
    public function generarPDF($id)
    {
        $model = Requests::query();

        $model = $model->where('id', $id)->with('beneficiaries','beneficiaries.address', 'quotes', 'priority', 'procedure', 'center', 'status_request', 'crecheRequest.degree')->first();

        $client = new Client();
        $response = $client->get('https://datac.difzapopan.gob.mx/api-servicios/public/api/data/catalogos');
        $catalogo = json_decode($response->getBody(), false);
        
        $vivienda = $catalogo->vivienda;
        $ocupacion = $catalogo->ocupacion;
        $escolaridad = $catalogo->escolaridad;

        $beneficiary = DB::table('beneficiaries as b')->join('economic_beneficiaries as eb','b.id','=','eb.beneficiary_id')->
        leftJoin('extra_works as ew','b.id','=','ew.beneficiary_id')->join('beneficiary_requests as br','b.id','=','br.beneficiary_id')->
            join('requests as r','r.id','=','br.request_id')->join('address_beneficiaries as ab','b.id','=','ab.beneficiary_id')->
            join('addresses as a','ab.address_id','=','a.id')->where('r.id',$id)
            ->get();


        $references = ReferencesRequest::whereHas('request', function ($query) use ($id) {
            $query->where('requests.id', $id);
        })->get();

        $pdf = PDF::loadView('pdf.requestCreche', [
            'data' => $model, 'degree' => $model->crecheRequest[0] ?? '',
            'child' => $model->beneficiaries[0] ?? '', 'parents' => $beneficiary ?? '', 'housing' => $housing ?? '',
            'references' => $references ?? '', 'vehicles' => $vehicles ?? '',
            'vivienda' => $vivienda , 'ocupacion' => $ocupacion, 'escolaridad' => $escolaridad
        ]);

        return $pdf->stream('Guarderia.pdf');
    }

    public function generarCiszPDF($id)
    {
        $model = Requests::query();
        $model = $model->where('id', $id)->with('beneficiaries','beneficiaries.address', 'quotes', 'priority', 'procedure', 'center', 'status_request', 'crecheRequest.degree')->first();

        $client = new Client();
        $response = $client->get('https://datac.difzapopan.gob.mx/api-servicios/public/api/data/catalogos');
        $catalogo = json_decode($response->getBody(), false);

        $escolaridad = $catalogo->escolaridad;
        $dependencias = $catalogo->dependencias;

        $beneficiary = DB::table('beneficiaries as b')->join('economic_beneficiaries as eb','b.id','=','eb.beneficiary_id')->
        join('beneficiary_requests as br','b.id','=','br.beneficiary_id')->
            join('requests as r','r.id','=','br.request_id')->join('address_beneficiaries as ab','b.id','=','ab.beneficiary_id')->
            join('addresses as a','ab.address_id','=','a.id')->where('r.id',$id)
            ->get();

        $references = ReferencesRequest::whereHas('request', function ($query) use ($id) {
            $query->where('requests.id', $id);
        })->get();
        
        $pdf = PDF::loadView('pdf.requestCisz', [
            'data' => $model, 'degree' => $model->crecheRequest[0] ?? '',
            'child' => $model->beneficiaries[0] ?? '', 'parents' => $beneficiary ?? '',
            'references' => $references ?? '','escolaridad' => $escolaridad, 'dependencias' => $dependencias
        ]);

        return $pdf->stream('NidoCisz.pdf');
    }
}

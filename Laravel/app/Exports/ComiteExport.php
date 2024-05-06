<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class ComiteExport implements FromView
{

    protected $requests, $totalCost, $beginFormatted, $finishFormatted;

    function __construct($requests, $totalCost, $beginFormatted, $finishFormatted)
    {
        $this->requests = $requests;
        $this->totalCost = $totalCost;
        $this->beginFormatted = $beginFormatted;
        $this->finishFormatted = $finishFormatted;
    }
    /**
     * @return \Illuminate\Support\Collection
     */
    public function view(): View
    {
        return view('export.comite', [
            'requests' => $this->requests, 'totalCost' => $this->totalCost, 'beginFormatted' => $this->beginFormatted, 'finishFormatted' => $this->finishFormatted
        ]);
    }
}

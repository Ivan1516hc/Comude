<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
    integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
<style>
    td {
        min-width: 50px;
        border: none !important;
    }

    th {
        padding-left: 5px !important;
    }

    body {
        display: block;
        font-size: 10px;
        width: 19.7cm;
    }

    .logo {
        text-align: center;
    }

    @page {
        margin: 15px;
    }

    .center {
        width: 410px;
    }

    .text-center {
        text-align: center;
    }

    .title p {
        font-size: 13px !important;
        text-align: center;
        padding: 0px !important;
        margin: 0px;
        font-weight: bolder;
    }

    .titulo {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
    }

    .table-bordered td,
    .table-bordered th {
        border: 1px solid #000;
        padding: 0;
        font-size: 10px;
    }

    .table thead th {
        text-align: left;
        border: 2px solid #000;
    }

    .table {
        border: 2px solid #000;
    }

    .border-none {
        border: none !important;
    }

    .bg-gray {
        background-color: rgb(175, 168, 168);
    }

    .mt-negative {
        margin-top: -10px;
    }

    .border {
        border: 2px solid #000 !important;
        display: inline-block;
        padding: 0 7px;
        margin-top: 7px;
        min-height: 20px !important;
    }

    .border2 {
        border: 2px solid #000 !important;
        padding: 0 5px;
        margin-top: 6px !important;
        min-height: 20px !important;
    }

    .table thead th {
        vertical-align: middle;
        /* border-bottom: none; */
    }

    .mh-20 {
        min-height: 20px;
    }

    p {
        font-size: 14px !important;
        text-align: justify;
    }
</style>
@php
    use GuzzleHttp\Client;
    $client = new Client();
@endphp

<body>
    <table>
        <tbody>
            <tr>
                <td class="center text-center" style="width: 100%;">
                    <img src="{{ public_path('assets/img/logo_comude.png') }}" width="170px">
                </td>
                <td>
                    <h2 class="titulo">Sistema para el Desarrollo Integral de la Familia Zapopan
                        <br>Centro de Desarrollo Infantil NO.6<br><br>
                        FOLIO DE SOLICITUD: {{ $data->id }}
                        <br>FECHA: {{ $data->finished }}
                    </h2>
                </td>
            </tr>
        </tbody>
    </table>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th class="bg-gray text-center" colspan="12">Datos del Infante</th>
            </tr>
            <tr>
                <th colspan="3" class="border-none">CURP</th>
                <th colspan="3" class="border-none"></th>
                <th colspan="3" class="border-none">Grado</th>
                <th colspan="3" class="border-none">Edad</th>
            </tr>
            <tr>
                <th colspan="6" class="border-none">
                    @php
                        $curp = $child->curp;
                        $curpCharacters = str_split($curp);
                    @endphp

                    @foreach ($curpCharacters as $character)
                        <div class="border">{{ $character }}</div>
                    @endforeach
                </th>
                <th colspan="3">{{ $degree->degree->name }}</th>
                <?php
                $fechaNacimiento = $child->fechanacimiento;
                $hoy = date('Y-m-d');
                $diff = date_diff(date_create($fechaNacimiento), date_create($hoy));
                
                $anios = $diff->y;
                $meses = $diff->m;
                ?>
                <th colspan="3">
                    @if ($anios > 0)
                        {{ $anios }} {{ $anios == 1 ? 'año' : 'años' }}
                        @if ($meses > 0)
                            @if ($anios > 0)
                                y
                            @endif
                            {{ $meses }} {{ $meses == 1 ? 'mes' : 'meses' }}
                        @endif
                    @elseif($meses > 0)
                        {{ $meses }} {{ $meses == 1 ? 'mes' : 'meses' }}
                    @else
                        0 meses
                    @endif
                </th>
            </tr>
            <tr>
                <th colspan="3" class="border-none">Nombre</th>
                <th colspan="2" class="border-none">Fecha de Nacimiento</th>
                <th colspan="2" class="border-none">Tipo de Sangre</th>
                <th colspan="2" class="border-none">Género</th>
                <th colspan="3" class="border-none"></th>
            </tr>
            <tr>
                <th colspan="3">{{ $child->nombre }} {{ $child->apaterno }} {{ $child->amaterno }}</th>
                <th colspan="2">{{ $child->fechanacimiento }}</th>
                <th colspan="2">{{ $child->tipo_sangre }}</th>
                <th colspan="2">{{ $child->sexo == 1 ? 'HOMBRE' : ($child->sexo == 2 ? 'MUJER' : 'Otro género') }}
                </th>
                <th colspan="3" class="border-none"></th>
            </tr>
            {{-- <tr>
                <th colspan="3" class="border-none">Domicilio</th>
                <th colspan="3" class="border-none">Entre calles</th>
                <th colspan="2" class="border-none">Colonia</th>
                <th colspan="2" class="border-none">Municipio</th>
                <th colspan="2" class="border-none">Teléfono</th>
            </tr>
            <tr>
                <th colspan="3">{{$child->calle}} #{{$child->numext}} @if ($child->numint)INT.{{$child->numint}}@endif</th>
                <th colspan="3">{{$child->primercruce}} @if ($child->segundocruce)y {{$child->segundocruce}}@endif</th>
                @php
                $response = $client->get('https://datac.difzapopan.gob.mx/api-servicios/public/api/data/colonias/'.$child->address->codigopostal);
                $colonia1 = json_decode($response->getBody(), false);
                $coloniaChild = collect($colonia1)->first(function ($objeto) use ($child) {
                return $objeto->id == $child->colonia;
                });
                $coloniaChild = $coloniaChild ? $coloniaChild->colonia : 'Colonia no encontrada';
                @endphp
                <th colspan="2">{{$coloniaChild}}</th>
                <th colspan="2">{{$child->municipio}}</th>
                <th colspan="2">{{$child->celular}}</th>
            </tr> --}}
        </thead>
    </table>
    <hr>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th class="bg-gray text-center" colspan="12">Datos de los Padres</th>
            </tr>
        </thead>
    </table>

    <table class="table table-bordered">
        @foreach ($parents as $item)
            <thead>
                <tr>
                    <th colspan="3" class="border-none">CURP</th>
                    <th colspan="3" class="border-none"></th>
                    <th colspan="1" class="border-none">Trabaja</th>
                    <th colspan="5" class="border-none">Ocupación</th>
                </tr>
                <tr>
                    <th colspan="6" class="border-none">
                        @php
                            $curp = $item->curp;
                            $curpCharacters = str_split($curp);
                        @endphp

                        @foreach ($curpCharacters as $character)
                            <div class="border">{{ $character }}</div>
                        @endforeach
                    </th>
                    <th colspan="1">{{ $item->trabaja == 1 ? 'SI' : 'NO' }}</th>
                    @php
                        $ocupacionEncontrada = collect($ocupacion)->first(function ($objeto) use ($item) {
                            return $objeto->id === $item->ocupacion;
                        });

                        $dataOcupacion = $ocupacionEncontrada ? $ocupacionEncontrada->ocupacion : 'Ocupación no encontrada';
                    @endphp
                    <th colspan="5">{{ $dataOcupacion }}</th>

                </tr>
                <tr>
                    <th colspan="3" class="border-none">Nombre</th>
                    <th colspan="2" class="border-none">Fecha de Nacimiento</th>
                    <th colspan="2" class="border-none">Lugar de Nacimiento</th>
                    <th colspan="3" class="border-none">Escolaridad</th>
                    <th colspan="2" class="border-none">Género</th>
                </tr>
                <tr>
                    <th colspan="3">{{ $item->nombre }} {{ $item->apaterno }} {{ $item->amaterno }}</th>
                    <th colspan="2">{{ $item->fechanacimiento }}</th>
                    <th colspan="2">{{ $item->lugar_nacimiento }}</th>
                    </th>
                    @php
                        $escolaridadEncontrada = collect($escolaridad)->first(function ($objeto) use ($item) {
                            return $objeto->id === $item->escolaridad;
                        });

                        $dataEscolaridad = $escolaridadEncontrada ? $escolaridadEncontrada->escolaridad : 'Escolaridad no encontrada';
                    @endphp
                    <th colspan="3">{{ $dataEscolaridad }}</th>
                    <th colspan="2">
                        {{ $item->sexo == 1 ? 'HOMBRE' : ($child->sexo == 2 ? 'MUJER' : 'Otro género') }}</th>
                </tr>
                <tr>
                    <th colspan="1" class="border-none">Casado Civil</th>
                    <th colspan="1">{{ $item->estado_civil == 1 ? 'SI' : 'NO' }}</th>
                    <th colspan="1" class="border-none">Casado Religioso</th>
                    <th colspan="1">{{ $item->estado_religioso == 1 ? 'SI' : 'NO' }}</th>
                    <th colspan="8" class="border-none"></th>
                </tr>
                <tr>
                    <th colspan="3" class="border-none">Domicilio</th>
                    <th colspan="3" class="border-none">Entre calles</th>
                    <th colspan="2" class="border-none">Colonia</th>
                    <th colspan="2" class="border-none">Municipio</th>
                    <th colspan="2" class="border-none">Teléfono</th>
                </tr>
                <tr>
                    <th colspan="3">{{ $item->calle }} #{{ $item->numext }} @if ($item->numint)
                            INT.{{ $item->numint }}
                        @endif
                    </th>
                    <th colspan="3">{{ $item->primercruce }} @if ($item->segundocruce)
                            y {{ $item->segundocruce }}
                        @endif
                    </th>
                    <th colspan="2">{{ $item->codigopostal }}</th>
                    <th colspan="2">{{ $item->municipio }}</th>
                    <th colspan="2">{{ $item->celular }}</th>
                </tr>
                <tr>
                    <th class="border-none text-center" colspan="12">Datos De Trabajo</th>
                </tr>
                <tr>
                    <th colspan="3" class="border-none">Empresa o Institución</th>
                    <th colspan="2" class="border-none">Puesto</th>
                    <th colspan="2" class="border-none">Antiguedad</th>
                    <th colspan="5" class="border-none">Jefe inmediato</th>
                </tr>
                <tr>
                    <th colspan="3">{{ $item->lugar_trabajo }}</th>
                    <th colspan="2">{{ $item->puesto }}</th>
                    <th colspan="2">{{ $item->antiguedad }}</th>
                    <th colspan="5">{{ $item->jefe_inmediato }}</th>
                </tr>
                <tr>
                    <th colspan="3" class="border-none">Domicilio</th>
                    <th colspan="3" class="border-none">Entre calles</th>
                    <th colspan="2" class="border-none">Colonia</th>
                    <th colspan="2" class="border-none">Municipio</th>
                    <th colspan="2" class="border-none">Teléfono</th>
                </tr>
                <tr>
                    <th colspan="3">{{ $item->calle_trabajo }} #{{ $item->numext_trabajo }} @if ($item->numint_trabajo)
                            INT.{{ $item->numint_trabajo }}
                        @endif
                    </th>
                    <th colspan="3">{{ $item->primer_cruce_trabajo }} @if ($item->segundo_cruce_trabajo)
                            y {{ $item->segundo_cruce_trabajo }}
                        @endif
                    </th>
                    @php
                        // $response = $client->get('https://datac.difzapopan.gob.mx/api-servicios/public/api/data/colonias/'.$item->codigo_trabajo);
                        // $colonia2 = json_decode($response->getBody(), false);

                        // $colonia = collect($colonia2)->first(function ($objeto) use ($item) {
                        // return $objeto->id == $item->colonia_trabajo;
                        // });

                        // $colonia = $colonia ? $colonia->colonia : 'Colonia no encontrada';
                        $colonia = 'Colonia no encontrada';
                    @endphp
                    <th colspan="2">{{ $colonia }}</th>
                    <th colspan="2">{{ $item->municipio_trabajo }}</th>
                    <th colspan="2">{{ $item->telefono_trabajo }}</th>
                </tr>
                <tr>
                    <th colspan="2" class="border-none">Horario Entrada</th>
                    <th colspan="1">{{ $item->entrada_trabajo }}</th>
                    <th colspan="2" class="border-none">Horario Salida</th>
                    <th colspan="1">{{ $item->salida_trabajo }}</th>
                    <th colspan="2" class="border-none">Otro Trabajo</th>
                    <th colspan="1">{{ $item->otro_trabajo == 1 ? 'SI' : 'NO' }}</th>
                    <th colspan="3" class="border-none"></th>
                </tr>
                @if ($item->lugar)
                    <tr>
                        <th class="border-none text-center" colspan="12">Datos Otro Trabajo</th>
                    </tr>
                    <tr>
                        <th colspan="3" class="border-none">Empresa o Institución</th>
                        <th colspan="5" class="border-none">Jefe inmediato</th>
                        <th colspan="2" class="border-none">Horario Entrada</th>
                        <th colspan="2" class="border-none">Horario Salida</th>
                    </tr>
                    <tr>
                        <th colspan="3">{{ $item->lugar ?? '' }}</th>
                        <th colspan="5">{{ $item->jefe ?? '' }}</th>
                        <th colspan="2">{{ $item->entrada ?? '' }}</th>
                        <th colspan="2">{{ $item->salida ?? '' }}</th>
                    </tr>
                    <!-- <tr>
                <th colspan="3" class="border-none">Domicilio</th>
                <th colspan="3" class="border-none">Entre calles</th>
                <th colspan="2" class="border-none">Colonia</th>
                <th colspan="2" class="border-none">Municipio</th>
                <th colspan="2" class="border-none">Teléfono</th>
            </tr>
            <tr>
                <th colspan="3">// {{ $item->work_extra[0]->estado_civil ?? '' }} #{{ $item->work_extra[0]->estado_civil ?? '' }}</th>
                <th colspan="3">// {{ $item->work_extra[0]->estado_civil ?? '' }}</th>
                <th colspan="2">// {{ $item->work_extra[0]->estado_civil ?? '' }}</th>
                <th colspan="2">// {{ $item->work_extra[0]->estado_civil ?? '' }}</th>
                <th colspan="2">// {{ $item->work_extra[0]->estado_civil ?? '' }}</th>
            </tr> -->
                @endif
                <tr>
                    <th class="border-none text-center" colspan="12">Datos De Ingresos</th>
                </tr>
                <tr>
                    <th colspan="2" class="border-none">Ingreso Mensual</th>
                    <th colspan="2">$ {{ number_format($item->ingreso_mensual_bruto, 2, '.', ',') }}</th>
                    <th colspan="8" class="border-none"></th>
                </tr>
                <tr>
                    <th colspan="2" class="border-none">Ingreso Mensual</th>
                    <th colspan="2">$ {{ number_format($item->ingreso_mensual_neto, 2, '.', ',') }}</th>
                    <th colspan="8" class="border-none"></th>
                </tr>
            </thead>
        @endforeach
    </table>

    <div style="page-break-before: always;"></div>
    <p>Observaciones:___________________________________________________________________________________
        _______________________________________________________________________________________________
        _______________________________________________________________________________________________
        _______________________________________________________________________________________________
    </p>
    <hr>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th class="bg-gray text-center" colspan="12">Referencias Personales</th>
            </tr>
        </thead>
    </table>

    <table class="table table-bordered">
        <thead>
            @foreach ($references as $item)
                <tr>
                    <th colspan="1" class="border-none">Nombre</th>
                    <th colspan="4">{{ $item->nombre }} {{ $item->apaterno }} {{ $item->amaterno }}</th>
                    <th colspan="1" class="border-none">Domicilio</th>
                    <th colspan="4">{{ $item->calle }} #{{ $item->numext }}, {{ $item->colonia_name }},
                        {{ $item->municipio }}</th>
                    <th colspan="1" class="border-none">Teléfono</th>
                    <th colspan="1">{{ $item->telefono }}</th>
                </tr>
            @endforeach
        </thead>
    </table>
    <hr>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th class="bg-gray text-center" colspan="12">Datos de Vivienda</th>
            </tr>
        </thead>
    </table>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th colspan="1" class="border-none">Propia</th>
                <th colspan="2" class="border-none">Valor Estimado</th>
                <th colspan="1" class="border-none">Estado</th>
                <th colspan="1" class="border-none">Cuota</th>
                <th colspan="5" class="border-none">A quien</th>
                <th colspan="1" class="border-none">Contrato</th>
                <th colspan="1" class="border-none">Vive con fam.</th>
            </tr>
            <tr>
                @php
                    $viviendaEncontrada = collect($vivienda)->first(function ($objeto) use ($housing) {
                        return $objeto->id == $housing->tipo_vivienda;
                    });

                    $dataVivienda = $viviendaEncontrada ? $viviendaEncontrada->vivienda : 'Vivienda no encontrada';
                @endphp
                <th colspan="1">{{ $housing->propia == 1 ? 'SI' : 'NO' }}</th>
                <th colspan="2">$ {{ number_format($housing->valor_estimado, 2, '.', ',') }}</th>
                <th colspan="1">{{ $dataVivienda }}</th>
                <th colspan="1">$ {{ number_format($housing->pago_mensual, 2, '.', ',') }}</th>
                <th colspan="5">{{ $housing->arrendador_propietario }}</th>
                <th colspan="1">{{ $housing->contrato == 1 ? 'SI' : 'NO' }}</th>
                <th colspan="1">{{ $housing->vive_con_familiares == 1 ? 'SI' : 'NO' }}</th>
            </tr>
            <tr>
                <th colspan="2" class="border-none">Vencimiento Contrato</th>
                <th colspan="2">{{ $housing->vencimiento_contrato }}</th>
                <th colspan="2" class="border-none">Cuanto Aporta</th>
                <th colspan="2">$ {{ number_format($housing->cantidad_aporta, 2, '.', ',') }}</th>
                <th colspan="4" class="border-none"></th>
            </tr>
            <tr>
                <th colspan="3" class="border-none">Domicilio</th>
                <th colspan="3" class="border-none">Entre calles</th>
                <th colspan="2" class="border-none">Colonia</th>
                <th colspan="2" class="border-none">Municipio</th>
                <th colspan="2" class="border-none">Teléfono</th>
            </tr>
            <tr>
                <th colspan="3">
                    {{ $housing->address[0]->calle }} #{{ $housing->address[0]->numext }} @if ($housing->address[0]->numint)
                        INT.{{ $housing->address[0]->numint }}
                    @endif
                </th>
                <th colspan="3">{{ $housing->address[0]->primercruce }} @if ($housing->address[0]->segundocruce)
                        y {{ $housing->address[0]->segundocruce }}
                    @endif
                </th>
                @php
                    // $response = $client->get('https://datac.difzapopan.gob.mx/api-servicios/public/api/data/colonias/'.$housing->address[0]->codigopostal);
                    // $colonia3 = json_decode($response->getBody(), false);
                    // $coloniaHousing = collect($colonia3)->first(function ($objeto) use ($housing) {
                    // return $objeto->id == $housing->colonia;
                    // });
                    // $coloniaHousing = $coloniaHousing ? $coloniaHousing->colonia : 'Colonia no encontrada';
                    $coloniaHousing = 'Colonia no encontrada';
                @endphp
                <th colspan="2">{{ $coloniaHousing }}</th>
                <th colspan="2">{{ $housing->address[0]->municipio }}</th>
                <th colspan="2">{{ $housing->telefono }}</th>
            </tr>
        </thead>
    </table>

    <hr>
    @if (isset($vehicles[0]))
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th class="bg-gray text-center" colspan="12">Datos Vehículos</th>
                </tr>
            </thead>
        </table>
        <table class="table table-bordered">
            <thead>
                @foreach ($vehicles as $item)
                    <tr>
                        <th colspan="1" class="border-none">Marca</th>
                        <th colspan="2">{{ $item->marca }}</th>
                        <th colspan="1" class="border-none">Tipo</th>
                        <th colspan="2">{{ $item->tipo }}</th>
                        <th colspan="1" class="border-none">Modelo</th>
                        <th colspan="2">{{ $item->modelo }}</th>
                        <th colspan="1" class="border-none">Valor Aproximado</th>
                        <th colspan="2">$ {{ number_format($item->valor_aproximado, 2, '.', ',') }}</th>
                    </tr>
                @endforeach
            </thead>
        </table>
    @endif
    <hr>
    <p><b>Bajo protesta de decir la verdad </b>manifiesto que los datos aceptados se apegan a la realidad los cuales
        podrás ser verificados en cualquier momento, asimismo me comprometo a que cualquier variación en el contenido lo
        haré del
        conocimiento de las autoridades del Centro de forma inmediata y por escrito. Estoy conciente que tengo 10 días a
        partir del
        llanado de la presente solicitud para entregar la documentación completa requerida. En caso de no cumplir con
        cada uno de los
        puntos aquí expuestos y en términos previsto doy por desistida mi solicitud.</p>
    <hr>
    <div class="text-center mt-5">______________________________________________________
    </div>
    <div>
        <p class="text-center">NOMBRE Y FIRMA PADRE O TUTOR</p>
    </div>
</body>

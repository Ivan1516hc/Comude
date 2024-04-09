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

    use Carbon\Carbon;

    $fecha = Carbon::createFromFormat('Y-m-d', $data->finished);
    $fechaFormateada = $fecha->format('d/m/Y');

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
                        <br>Centro de Atención Infantil Nido CISZ<br><br>
                        FOLIO DE SOLICITUD: {{ $data->invoice }}
                        <br>FECHA: {{ $fechaFormateada }}
                    </h2>
                </td>
            </tr>
        </tbody>
    </table>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th class="bg-gray text-center" colspan="12">Datos del niño(a)</th>
            </tr>
            <tr>
                <th colspan="3" class="border-none">CURP</th>
                <th colspan="3" class="border-none"></th>
                <th colspan="3" class="border-none"></th>
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
                <th colspan="3" class="border-none"></th>
                {{-- <th colspan="3">{{ $degree->degree->name }}</th> --}}
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
                <th colspan="2" class="border-none">Fecha de nacimiento</th>
                <th colspan="2" class="border-none">Tipo de sangre</th>
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
        </thead>
    </table>
    <hr>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th class="bg-gray text-center" colspan="12">Datos de trabajador(a)</th>
            </tr>
        </thead>
    </table>

    <table class="table table-bordered">
        @foreach ($parents as $item)
            <thead>
                <tr>
                    <th colspan="3" class="border-none">CURP</th>
                    <th colspan="4" class="border-none"></th>
                    <th colspan="1" class="border-none">Género</th>
                    <th colspan="4" class="border-none">Escolaridad</th>
                </tr>
                <tr>
                    <th colspan="7" class="border-none">
                        @php
                            $curp = $item->curp;
                            $curpCharacters = str_split($curp);
                        @endphp

                        @foreach ($curpCharacters as $character)
                            <div class="border">{{ $character }}</div>
                        @endforeach
                    </th>

                    <th colspan="1">
                        {{ $item->sexo == 1 ? 'HOMBRE' : ($child->sexo == 2 ? 'MUJER' : 'Otro género') }}</th>
                    @php
                        $escolaridadEncontrada = collect($escolaridad)->first(function ($objeto) use ($item) {
                            return $objeto->id === $item->escolaridad;
                        });

                        $dataEscolaridad = $escolaridadEncontrada
                            ? $escolaridadEncontrada->escolaridad
                            : 'Escolaridad no encontrada';
                    @endphp
                    <th colspan="4">{{ $dataEscolaridad }}</th>

                </tr>
                <tr>
                    <th colspan="4" class="border-none">Nombre</th>
                    <th colspan="3" class="border-none">Fecha de nacimiento</th>
                    <th colspan="3" class="border-none">Lugar de nacimiento</th>
                    <th colspan="2" class="border-none">Casado civil</th>

                </tr>
                <tr>
                    <th colspan="4">{{ $item->nombre }} {{ $item->apaterno }} {{ $item->amaterno }}</th>
                    <th colspan="3">{{ $item->fechanacimiento }}</th>
                    <th colspan="3">{{ $item->lugar_nacimiento }}</th>
                    <th colspan="2">{{ $item->estado_civil == 1 ? 'SI' : 'NO' }}</th>

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
                    <th class="border-none text-center" colspan="12">Datos de trabajo</th>
                </tr>
                <tr>
                    <th colspan="3" class="border-none">Dependencia</th>
                    <th colspan="2" class="border-none">Puesto</th>
                    <th colspan="2" class="border-none">Antiguedad</th>
                    <th colspan="3" class="border-none">Jefe inmediato</th>
                    <th colspan="2" class="border-none">Jefe inmediato</th>
                </tr>
                <tr>
                    @php
                        $dependenciaEncontrado = collect($dependencias)->first(function ($objeto) use ($item) {
                            return $objeto->id == $item->lugar_trabajo;
                        });

                        $dataDependencia = $dependenciaEncontrado
                            ? $dependenciaEncontrado->dependencia
                            : 'Dependencia no encontrada';
                    @endphp
                    <th colspan="3">{{ $dataDependencia }}</th>
                    <th colspan="2">{{ $item->puesto }}</th>
                    <th colspan="2">{{ $item->antiguedad }}</th>
                    <th colspan="3">{{ $item->jefe_inmediato }}</th>
                    <th colspan="2">{{ $item->jefe_inmediato }}</th>
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
                    <th colspan="2">{{ $item->colonia_name_trabajo }}</th>
                    <th colspan="2">{{ $item->municipio_trabajo }}</th>
                    <th colspan="2">{{ $item->telefono_trabajo }}</th>
                </tr>
                <tr>
                    <th colspan="2" class="border-none">Horario entrada</th>
                    <th colspan="2">{{ $item->entrada_trabajo }}</th>
                    <th colspan="2" class="border-none">Horario salida</th>
                    <th colspan="2">{{ $item->salida_trabajo }}</th>
                    <th colspan="4" class="border-none"></th>
                </tr>
            </thead>
        @endforeach
    </table>

    {{-- <div style="page-break-before: always;"></div> --}}
    <p>Observaciones:___________________________________________________________________________________
        _______________________________________________________________________________________________
        _______________________________________________________________________________________________
        _______________________________________________________________________________________________
    </p>
    <hr>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th class="bg-gray text-center" colspan="12">Referencias</th>
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
        <p class="text-center">NOMBRE Y FIRMA TRABAJADOR(A)</p>
    </div>
</body>

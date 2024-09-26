<!DOCTYPE html>
<html>
@php
use Carbon\Carbon;
@endphp

<head>
    <meta charset="utf-8">
    <link rel="icon" type="image/x-icon" href="assets/img/Logo_DIF.png">
    <title>Comite</title>
    <style>
        .titulo {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
        }

        table {
            table-layout: auto;
            border-collapse: collapse;
            width: 80%;
        }

        body {
            width: 18cm;
            height: 27cm;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        td {
            font-size: 8px;
            word-wrap: break-word;
        }

        th {
            font-size: 10px;
            background-color: #f2f2f2;
            text-align: center;
        }

        #sin td {
            border: none;
        }
    </style>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th style="width: 120px;">NUM CONSECUTIVO</th>
                <th style="width: 120px;">FOLIO DE SOLICITUD</th>
                <th style="width: 120px;">APELLIDO PATERNO</th>
                <th style="width: 120px;">APELLIDO MATERNO</th>
                <th style="width: 120px;">NOMBRE(S)</th>

                <th style="width: 100px;">EDAD</th>

                <th style="width: 120px;">GÉNERO</th>
                <th style="width: 120px;">CORREO</th>
                <th style="width: 120px;">DISCIPLINA DEPORTIVA</th>
                <th style="width: 120px;">ATLETA/GUÍA</th>

                <th style="width: 120px;">LOGROS DEPORTIVOS IMPORTANTES</th>

                <th style="width: 120px;">NOMBRE DE LA COMPETENCIA</th>
                <th style="width: 120px;">TIPO DE COMPETENCIA</th>
                <th style="width: 120px;">FECHA DE COMPETENCIA</th>
                <th style="width: 120px;">CLASIFICA A OTRA COMPETENCIA</th>

                <th style="width: 120px;">CUENTA CLABE</th>
                <th style="width: 120px;">BANCO</th>
                <th style="width: 120px;">TITUTAR DE LA CUENTA BANCARIA</th>

                <th style="width: 120px;">TELÉFONO CELULAR</th>
                <th style="width: 120px;">MONTO SOLICITADO</th>
                <th style="width: 120px;">MONTO APROBADO</th>

                <th style="width: 120px;">OBSERVACIONES</th>

                <th style="width: 120px;">CANTIDAD SOLICITUDES PRESENTADAS EN EL AÑO</th>
                <th style="width: 120px;">CANTIDAD DE SOLICITUDES APOYADAS EN EL AÑO</th>
                <th style="width: 120px;">TOTAL MONTO ANUAL APOYADO</th>

                <th style="width: 120px;">SESIÓN</th>
                
                <!-- <th style="width: 30px;">TOTAL MONTO PAGADO</th>
                <th style="width: 30px;">TOTAL MONTO COMPROBADO</th>
                <th style="width: 30px;">TOTAL MONTO DEVUELTO</th> -->
            </tr>
        </thead>
        <tbody>
            @php
            $i = 0;
            @endphp
            @foreach ($requests as $request)
            @php
            $fullName = $request->aplicant->name ?? 'null';
            $nameParts = explode(' ', $fullName);

            $maternalSurname = array_pop($nameParts); // Último elemento
            $paternalSurname = array_pop($nameParts); // Penúltimo elemento
            $firstName = implode(' ', $nameParts); // El resto son los nombres
            @endphp
            <tr>
                <td>{{ $i + 1 }}</td>
                <td>{{ $request->invoice ?? 'null' }}</td>
                <td>{{ $paternalSurname }}</td>
                <td>{{ $maternalSurname }}</td>
                <td>{{ $firstName }}</td>

                <td>
                    @php
                    $birtdate = $request->aplicant->birtdate;
                    $age = $birtdate ? Carbon::parse($birtdate)->age : 'null';
                    @endphp
                    {{ $age }}
                </td>


                <td>{{ $request->aplicant->gender ?? 'null' }}</td>
                <td>{{ $request->aplicant->email ?? 'null' }}</td>
                <td>{{ $request->discipline->name ?? 'null' }}</td>
                <td>{{ $request->modality ?? 'null' }}</td>

                <td>test logros deportivos</td>

                <td>{{ $request->competition->name ?? 'null' }}</td>
                <td>{{ $request->competition->competition_type->name ?? 'null' }}</td>
                <td>{{ $request->competition->start_date }} a {{ $request->competition->ending_date }}</td>
                <td>{{ $request->competition->classify ?? 'null' }}</td>

                <td>{{ $request->bank_account->key_account ?? 'null' }}</td>
                <td>{{ $request->bank_account->bank ?? 'null' }}</td>
                <td>{{ $request->bank_account->titular_persona_name ?? 'null' }}</td>

                <td>{{ $request->aplicant->phone_number ?? 'null' }}</td>
                <td>{{ $request->competition->requested_budget ?? 'null' }}</td>
                <td>{{ $request->competition->approved_budget ?? 0 }}</td>

                <td>{{ $request->status_request->name ?? 'null' }}</td>

                <td>{{ $request->aplicant->other_requests_count ?? 0 }}</td>
                <td>{{ $request->aplicant->accepted_requests_count ?? 0 }}</td>
                <td>{{ $request->aplicant->approved_budget_sum ?? 0 }}</td>
            </tr>
            @php
            $i++;
            @endphp
            @endforeach
        </tbody>
    </table>
</body>

</html>
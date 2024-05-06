<!DOCTYPE html>
<html>

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
                <th style="width: 20px;">No.</th>
                <th style="width: 45px;">Folio</th>
                <th style="width: 40px;">Nombre</th>
                <th style="width: 120px;">Cantidad solicitudes por atleta</th>
                <th style="width: 130px;">Disciplina</th>
                <th style="width: 35px;">Competencia</th>
                <th style="width: 35px;">Tipo de competencia</th>
                <th style="width: 30px;">Monto minimo</th>
                <th style="width: 30px;">Monto maximo</th>
                <th style="width: 30px;">Monto solicitado</th>
                <th style="width: 30px;">Monto aprobado</th>
                <th style="width: 30px;">Status</th>
                <th style="width: 30px;">Fecha de solicitud</th>
            </tr>
        </thead>
        <tbody>
            @php
                $i = 0;
            @endphp
            @foreach ($requests as $request)
                <tr>
                    <td>{{ $i + 1 }}</td>
                    <td>{{ $request->invoice ?? 'null' }}</td>
                    <td>{{ $request->aplicant->name ?? 'null' }}</td>
                    <td>{{ $request->quantity ?? 'null' }}</td>
                    <td>{{ $request->discipline->name ?? 'null' }}</td>
                    <td>{{ $request->competition->name ?? 'null' }}</td>
                    <td>{{ $request->competition->competition_type->name ?? 'null' }}</td>
                    <td>{{ $request->competition->competition_type == '1' ? 0 : ($request->competition->competition_type == '2' ? 5000 : 10000) }}</td>
                    <td>{{ $request->competition->competition_type == '1' ? 5000 : ($request->competition->competition_type == '2' ? 10000 : 20000) }}</td>
                    <td>{{ $request->competition->requested_budget ?? 'null' }}</td>
                    <td>{{ $request->competition->approved_budget ?? '' }}</td>
                    <td>{{ $request->status_request->name ?? 'null' }}</td>
                    <td>{{ $request->finished ?? 'null' }}</td>
                </tr>
                @php
                    $i++;
                @endphp
            @endforeach
        </tbody>
    </table>
</body>

</html>

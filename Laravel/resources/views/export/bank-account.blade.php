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
                <th style="width: 35px;">Tipo de competencia</th>
                <th style="width: 30px;">Monto solicitado</th>
                <th style="width: 30px;">Monto aprobado</th>
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
                </tr>
                @php
                    $i++;
                @endphp
            @endforeach
        </tbody>
    </table>
</body>

</html>

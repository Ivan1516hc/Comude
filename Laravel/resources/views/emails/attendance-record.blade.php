<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Asistencia</title>
</head>
<body style="font-family: Arial, sans-serif;">

    <h1>Registro de Asistencia</h1>

    <p>Hola {{ $name }}</p>
    <p>{{$label}}.</p>
    
    <p>{{$quote}}</p>

    <p>Si necesitas mas informacion comunicate con nosotros. Telefono:{{$request->center->number ?? ''}}</p>

    <p>¡Gracias!</p>
</body>
</html>
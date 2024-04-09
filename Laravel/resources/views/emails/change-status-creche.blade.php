<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cambio de Estado</title>
</head>

<body style="font-family: Arial, sans-serif;">

    <h1>Cambio de Estado</h1>

    <p>Hola {{ $name }},</p>

    <p>Recibiste este correo porque el estado del beneficiario {{$beneficiary->nombre}} {{$beneficiary->apaterno}} {{$beneficiary->amaterno}} a cambiado.</p>


    @isset($label)
    <p>NUEVA GUARDERIA</p>
    <p>Centro: {{$creche->center->name}} <br>
        Domicilio: {{$creche->center->address}} <br>
        Grado: {{$creche->degree->name}} <br>
        Sala: {{$creche->room->name}}</p>
        
    <p>Si necesitas mas informacion comunicate con nosotros. Telefono:{{$creche->center->number}}</p>
    @endisset

    @isset($newLabel)
    <p>NUEVO ESTADO DE BENEFICIARIO: {{$newLabel == 1 ? 'DADO DE ALTA A' :'DADO DE BAJA DE'}} GUARDERIAS</p>
    
    <p>Si necesitas mas informacion comunicate con nosotros. Telefono:{{$telefono}}</p>
    @endisset


    <p>¡Gracias!</p>
</body>

</html>
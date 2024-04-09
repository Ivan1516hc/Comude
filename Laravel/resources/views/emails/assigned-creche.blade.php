<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Metadatos y título aquí -->
</head>

<body style="font-family: Arial, sans-serif;">

    <h1>Guarderia Asignada</h1>

    <p>Hola {{ $name }}.</p>

    <p>Recibiste este correo porque se a asignado guarderia al beneficiario {{$beneficiary->nombre}} {{$beneficiary->apaterno}} {{$beneficiary->amaterno}}.</p>

    <p>Centro: {{$creche->center->name}} <br>Domicilio: {{$creche->center->address}} <br>Grado: {{$creche->degree->name}} <br>Sala: {{$creche->room->name}}</p>

    <p>Si necesitas más información, comunícate con nosotros. Teléfono: {{$creche->center->number ?? ''}}</p>

    <p>¡Gracias!</p>
</body>

</html>
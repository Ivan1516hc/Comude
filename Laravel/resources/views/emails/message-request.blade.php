<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Metadatos y título aquí -->
</head>

<body style="font-family: Arial, sans-serif;">

    <h1>Mensaje por motivo de {{$motivo->name}}</h1>

    <p>Hola {{ $name }}.</p>

    <p>{{ $text }}</p>

    {{-- <p>Si necesitas más información, comunícate con nosotros. Teléfono: {{ $creche->center->number ?? '' }}</p> --}}

    <p>¡Gracias!</p>
</body>

</html>

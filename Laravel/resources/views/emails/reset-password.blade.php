<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecimiento de Contraseña</title>
</head>
<body style="font-family: Arial, sans-serif;">

    <h1>Restablecimiento de Contraseña</h1>

    {{-- <p>Hola {{ $name }},</p> --}}

    <p>Recibiste este correo porque se solicitó un restablecimiento de contraseña para tu cuenta.</p>

    <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>

    <a href="{{ $resetUrl }}" target="_blank">Restablecer Contraseña</a>

    <p>Si no solicitaste un restablecimiento de contraseña, puedes ignorar este correo y tu contraseña no será modificada.</p>

    <p>¡Gracias!</p>

</body>
</html>
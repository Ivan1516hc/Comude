<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Metadatos y título aquí -->
</head>

<body style="font-family: Arial, sans-serif;">
<img src="https://app4.comudezapopan.gob.mx/api/public/assets/img/logoEmailComude.png" alt="" width="100%">
    <p>Estimado (a). <strong>{{$name}}</strong></p>
    <p>El Comité de Becas te informa que ha rechazado tu solicitud para la competencia de <b>{{$competition->name}}</b> del próximo <b>{{$competition->start_date}}</b> a celebrarse en <b>{{$competition->country->common_spa}}</b>.</p>
    <p>El motivo por el cual fue rechazada tu solicitud es:<br>{{$reason}}</p>
    <p>Te recordamos que puedes revisar el avance de tu solicitud en el Portal de Becas.</p>
    <p>En el Consejo Municipal del Deporte de Zapopan, Jalisco estamos convencidos en la estimulación, promoción, apoyo y enseñanza del deporte para convertirnos en un organismo descentralizado líder en la Zona Metropolitana de Guadalajara -ZMG, en la generación de proyectos creativos e innovadores que beneficien y activen a los Zapopanos.</p>
    <p>El contenido de este correo electrónico es información pública y susceptible de una solicitud de información, y puede contener datos personales de acuerdo a lo establecido en el artículo 3, fracciones IX y X de la Ley de Protección de Datos Personales en Posesión de Sujetos Obligados del Estado de Jalisco y sus Municipios, así como información confidencial de conformidad al artículo 21 de la Ley de Transparencia y Acceso a la Información Pública del Estado de Jalisco y sus Municipios.</p>
    <p>Atendiendo a lo establecido por el artículo 72 de la citada Ley de Protección de Datos Personales, el receptor, que adquiere el carácter de responsable, de los datos personales deberá tratar los mismos comprometiéndose a garantizar su confidencialidad y únicamente utilizarlos para los fines que le fueron transferidos. El tratamiento de esta información deberá cumplir en todo momento con las disposiciones de las leyes antes señaladas, por lo que cualquier transferencia o tratamiento de los datos por personas o entidades distintas a las dirigidas se encuentra prohibido; salvo las excepciones contempladas en los artículos 15 y 75 de la Ley de Protección de Datos Personales en Posesión de Sujetos Obligados del Estado de Jalisco y sus Municipios.</p>
    <p><b>"Ahorra energía y papel, si no es necesario no imprimas este correo".</b></p>
</body>

</html>
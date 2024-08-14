<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Metadatos y título aquí -->
</head>

<body style="font-family: Arial, sans-serif;">
    <!-- <p>Estimado(a) <strong>{{ $name }}</strong>{{ $name }}, hemos recibido tu solicitud de beca deportiva, a la cual se le asignado el folio <strong>{{ $invoice }}</strong>.</p>

    <p>Los administradores del trámite revisarán la solicitud, para verificar que la documentación proporcionada cubra los requisitos establecidos en el Reglamento general del programa de becas para deportistas de alto rendimiento, masters, destacadas y destacados del municipio de Zapopan, Jalisco.</p>

    <p>Las actualizaciones importantes del estado de la solicitud te llegarán al correo electrónico registrado.</p>

    <p>¡En Zapopan te apoyamos para llevar tu desempeño deportivo <strong>A OTRO NIVEL!</strong></p> -->
    <img src="https://app4.comudezapopan.gob.mx/api/public/assets/img/logoEmailComude.png" alt="" width="100%" height="150px">
    <p>Estimado (a). <strong>{{ $name }}</strong></p>
    <p>Hemos recibido tu solicitud de participar en el Programa de Plan de Becas a Deportistas de Alto Rendimiento, Másters Destacadas y Destacados del Municipio de Zapopan, Jalisco con folio de solicitud <strong>{{ $invoice }}</strong> para tu competencia de <strong>{{$competition->name}}</strong> del próximo <strong>{{ \Carbon\Carbon::parse($competition->start_date)->translatedFormat('j \d\e F \d\e\l Y') }}</strong> a celebrarse en <strong>{{$competition->country->common_spa}}</strong>.</p>
    <p>Por el momento tu solicitud se encuentra en estatus de REVISIÓN, una vez que sea revisada por el Comité de Becas, te enviaremos un correo informándote si fue aceptada o rechazada.</p>
    <p>Te recordamos que puedes revisar el avance de tu solicitud en el Portal de Becas. <a href="https://app4.comudezapopan.gob.mx/#/solicitante/dashboard">https://app4.comudezapopan.gob.mx/#/solicitante/dashboard</a></p>
    <p>En el Consejo Municipal del Deporte de Zapopan, Jalisco estamos convencidos en la estimulación, promoción, apoyo y enseñanza del deporte para convertirnos en un organismo descentralizado líder en la Zona Metropolitana de Guadalajara -ZMG, en la generación de proyectos creativos e innovadores que beneficien y activen a los Zapopanos.</p>

    <p>El contenido de este correo electrónico es información pública y susceptible de una solicitud de información, y puede contener datos personales de acuerdo a lo establecido en el artículo 3, fracciones IX y X de la Ley de Protección de Datos Personales en Posesión de Sujetos Obligados del Estado de Jalisco y sus Municipios, así como información confidencial de conformidad al artículo 21 de la Ley de Transparencia y Acceso a la Información Pública del Estado de Jalisco y sus Municipios.</p>
    <p>Atendiendo a lo establecido por el artículo 72 de la citada Ley de Protección de Datos Personales, el receptor, que adquiere el carácter de responsable, de los datos personales deberá tratar los mismos comprometiéndose a garantizar su confidencialidad y únicamente utilizarlos para los fines que le fueron transferidos. El tratamiento de esta información deberá cumplir en todo momento con las disposiciones de las leyes antes señaladas, por lo que cualquier transferencia o tratamiento de los datos por personas o entidades distintas a las dirigidas se encuentra prohibido; salvo las excepciones contempladas en los artículos 15 y 75 de la Ley de Protección de Datos Personales en Posesión de Sujetos Obligados del Estado de Jalisco y sus Municipios.</p>
    <p><strong>"Ahorra energía y papel, si no es necesario no imprimas este correo".</strong></p>
</body>

</html>
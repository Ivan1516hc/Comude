<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Metadatos y título aquí -->
</head>

<body style="font-family: Arial, sans-serif;">
    <!-- <p>Estimado(a) <strong>{{$name}}</strong>.</p>

    <p>Nos complace informarte que tu solicitud con folio <strong>{{$invoice}}</strong> ha sido revisada y aprobada por el Comité técnico para la asignación de becas para deportistas de alto rendimiento, masters, destacadas y destacados del Consejo Municipal del Deporte de Zapopan. ¡Enhorabuena!</p>

    <p>A continuación, detallamos los términos de la aprobación: <br>
        Solicitud aprobada: [Descripción breve de la solicitud aprobada] <br>
        Fecha de la competencia: <strong>{{$dates}}</strong><br>
        Monto aprobado: <strong>${{$amount}}</strong><br>
        Fecha de comprobación: <strong>{{$send_date}}</strong></p>

    <p>Te felicitamos por la aprobación de tu solicitud de beca, deseamos que alcances el objetivo que te has propuesto en esta competencia. ¡En Zapopan nos causa mucha alegría poder apoyarte para llevar tu desempeño deportivo A OTRO NIVEL!</p>

    <p>Para expresar tu aceptación de la beca. Es necesario que acudas a las oficinas de Comude Zapopan, localizadas en la Unidad Deportiva Ángel "Zapopan" Romero (Tabachines), Periférico Manuel Gómez Morín Norte 1467, 2do piso, esquina Av. de los Tabachines, Col. La Palmita Norte, Zapopan, Jalisco. CP 45186 <a href="https://maps.app.goo.gl/eoMK3SxMctcvDr1x5">https://maps.app.goo.gl/eoMK3SxMctcvDr1x5</a></p>

    <p>Por favor, revisa detenidamente esta información. Si tienes alguna pregunta sobre los términos de la aprobación o si necesitas asistencia adicional, por favor comunícate con nosotros al 3338182200 ext _______ o por correo electrónico a _____________.</p>

    <p>NOTAS:</p>
    <p>a) Es muy importante que tengas en cuenta que, de acuerdo a los artículos 11 y 18 del Reglamento general del programa de becas para deportistas de alto rendimiento, masters, destacadas y destacados del municipio de Zapopan, Jalisco, deberás entregar documentación justificativa del gasto efectuado; los documentos podrán ser comprobantes fiscales o no fiscales, fotografías, así como escrito con la descripción de logros obtenidos y la aplicación del recurso.</p>

    <p>b) En caso de no asistir a la competencia deportiva motivo de presente beca, debes devolver al Comude Zapopan de manera íntegra el recurso otorgado, en un plazo no mayor a 3 (tres) días después de la fecha programada de la competencia deportiva, de conformidad a lo establecido en el artículo 20 fracción VI del mencionado reglamento.</p> -->
    <img src="https://app4.comudezapopan.gob.mx/api/public/assets/img/logoEmailComude.png" alt="" width="100%">
    <p>Estimado (a). <strong>{{$name}}</strong></p>
    <p>El Comité de Becas ha autorizado una beca por <strong>${{$amount}}</strong> para tu solicitud de la competencia de <b>{{$competition->name}}</b> del próximo <b>{{$competition->start_date}}</b> a celebrarse en <b>{{$competition->country->common_spa}}</b>.</p>
    <p>Tu solicitud se encuentra en estatus de AUTORIZADA y te enviaremos un correo electrónico una vez que tu beca haya sido depositada en tu cuenta bancaria.
    Para expresar tu aceptación de la beca. Es necesario que acudas a las oficinas de Comude Zapopan, localizadas en la Unidad Deportiva Ángel "Zapopan" Romero (Tabachines), Periférico Manuel Gómez Morín Norte 1467, 2do piso, esquina Av. de los Tabachines, Col. La Palmita Norte, Zapopan, Jalisco. CP 45186 <a href="https://maps.app.goo.gl/eoMK3SxMctcvDr1x5">https://maps.app.goo.gl/eoMK3SxMctcvDr1x5</a></p>
    <p>Te recordamos que una vez que finalice tu competencia, tendrás 30 días para adjuntar en el portal de becas las evidencias, las cuales te las enlistamos a continuación:<br>
    · Cinco fotografías como mínimo que avalen y demuestren la asistencia a la competencia. Obligatorio;<br>
    · Comprobación del gasto de transporte aéreo, marítimo o terrestre;<br>
    · Comprobación del gasto de viáticos como alimentación y gastos varios;<br>
    · Comprobación del gasto de hospedaje;<br>
    · Comprobación del pago de inscripción a la competencia.</p>
    <p>En el Consejo Municipal del Deporte de Zapopan, Jalisco estamos convencidos en la estimulación, promoción, apoyo y enseñanza del deporte para convertirnos en un organismo descentralizado líder en la Zona Metropolitana de Guadalajara -ZMG, en la generación de proyectos creativos e innovadores que beneficien y activen a los Zapopanos.</p>
    <p>El contenido de este correo electrónico es información pública y susceptible de una solicitud de información, y puede contener datos personales de acuerdo a lo establecido en el artículo 3, fracciones IX y X de la Ley de Protección de Datos Personales en Posesión de Sujetos Obligados del Estado de Jalisco y sus Municipios, así como información confidencial de conformidad al artículo 21 de la Ley de Transparencia y Acceso a la Información Pública del Estado de Jalisco y sus Municipios.</p>
    <p><strong>"Ahorra energía y papel, si no es necesario no imprimas este correo".</strong></p>
</body>

</html>
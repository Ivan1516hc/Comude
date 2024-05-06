<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Announcement;
use App\Models\Aplicant;
use App\Models\CompetitionType;
use App\Models\CountriesStates;
use App\Models\Discipline;
use App\Models\DocumentProcedure;
use App\Models\JustificationTypes;
use App\Models\MessageMotive;
use App\Models\Procedure;
use App\Models\Role;
use App\Models\StatusRequest;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $estados = [
            'Aguascalientes',
            'Baja California',
            'Baja California Sur',
            'Campeche',
            'Chiapas',
            'Chihuahua',
            'Ciudad de México',
            'Coahuila',
            'Colima',
            'Durango',
            'Estado de México',
            'Guanajuato',
            'Guerrero',
            'Hidalgo',
            'Jalisco',
            'Michoacán',
            'Morelos',
            'Nayarit',
            'Nuevo León',
            'Oaxaca',
            'Puebla',
            'Querétaro',
            'Quintana Roo',
            'San Luis Potosí',
            'Sinaloa',
            'Sonora',
            'Tabasco',
            'Tamaulipas',
            'Tlaxcala',
            'Veracruz',
            'Yucatán',
            'Zacatecas'
        ];

        // Lista de deportes olímpicos
        $deportesOlimpicos = [
            'ACONDICIONAMIENTO FÍSICO',
            'AGUAS ABIERTAS',
            'AIKIDO',
            'AJEDREZ',
            'APNEA',
            'ARCO COMPUESTO',
            'ARCO RECURVO',
            'ATLETISMO',
            'BÁDMINTON',
            'BAILE Y DANZA DEPORTIVA',
            'BALLROOM',
            'BALONCESTO',
            'BÉISBOL',
            'BOLICHE',
            'BOXEO',
            'BREAKING',
            'BUCEO',
            'CANOA',
            'CHARRERÍA',
            'CICLISMO DE MONTAÑA',
            'CICLISMO DE PISTA',
            'CICLISMO DE RUTA',
            'CLAVADOS',
            'ESCALADA DEPORTIVA',
            'ESGRIMA',
            'FISICOCONSTRUCTIVISMO',
            'FLAG',
            'FRONTÓN',
            'FUT 7',
            'FUTBOL AMERICANO',
            'FUTBOL ASOCIACIÓN',
            'FUTBOL RÁPIDO',
            'FUTSAL',
            'GIMNASIA AERÓBICA',
            'GIMNASIA ARTÍSTICA',
            'GIMNASIA CON TRAMPOLÍN',
            'HALTEROFILIA',
            'HANDBALL',
            'HOCKEY SOBRE PASTO',
            'JUDO',
            'KARATE DO',
            'KAYAC',
            'KENDO',
            'KICKBOXING',
            'KIU DO',
            'KUNG FU',
            'LACROSSE',
            'LEVANTAMIENTO DE POTENCIA',
            'LIMA LAMA',
            'LUCHA ASOCIADAS',
            'MONTAÑISMO',
            'NATACIÓN',
            'PICKLEBALL',
            'POLO ACUÁTICO',
            'REMO',
            'RUGBY',
            'SOFTBOL',
            'SQUASH',
            'TAEKWONDO',
            'TAI CHI',
            'TENIS',
            'TENIS DE MESA',
            'TRIATLÓN',
            'ULAMA',
            'ULTIMATE',
            'VOLEIBOL DE PLAYA',
            'VOLEIBOL',
            'YOGA'
        ];

        // Crear un registro para cada deporte olímpico
        foreach ($deportesOlimpicos as $deporte) {
            Discipline::create([
                'name' => $deporte
            ]);
        }

        // Crear un registro para cada deporte olímpico
        foreach ($estados as $item) {
            CountriesStates::create([
                'name' => $item,
                'country_id' => 120
            ]);
        }


        //Status de solicitud
        StatusRequest::create([
            'name'  => 'SIN TERMINAR'
        ]);
        StatusRequest::create([
            'name'  => 'EN REVISIÓN'
        ]);
        StatusRequest::create([
            'name'  => 'ACEPTADO'
        ]);
        StatusRequest::create([
            'name'  => 'RECHAZADO'
        ]);
        StatusRequest::create([
            'name'  => 'EN ESPERA'
        ]);
        StatusRequest::create([
            'name'  => 'CANCELADA'
        ]);
        StatusRequest::create([
            'name'  => 'COMPLETADA'
        ]);
        StatusRequest::create([
            'name'  => 'MODIFICANDO'
        ]);
        StatusRequest::create([
            'name'  => 'ENVIADA'
        ]);

        //Roles de usuario
        Role::create([
            'name'  => 'PROCEDURE ADMIN',
        ]);
        Role::create([
            'name'  => 'GENERAL ADMIN',
        ]);

        //Trámites
        Procedure::create([
            'name' => 'SPORTS SCHOLARSHIPS'
        ]);

        //Motivos de mensajes
        MessageMotive::create([
            'name' => 'OBSERVACIÓN'
        ]);
        MessageMotive::create([
            'name' => 'COMENTARIO'
        ]);
        MessageMotive::create([
            'name' => 'AVISO'
        ]);
        MessageMotive::create([
            'name' => 'CORRECCIÓN'
        ]);

        //Usuario
        User::create([
            'name' => 'Benjamin Ivan Hernandez Castro',
            'role_id' => 1,
            'procedure_id' => 1,
            'email' => 'bihernandez@difzapopan.gob.mx',
            'password' => Hash::make('150870266'),
        ]);

        //Convocatoria
        Announcement::create([
            'name' => 'CONVOCATORIA 2024',
            'start_budget' => '1000000',
            'start_date' => '2024-01-01',
            'ending_date' => '2024-12-31',
            'status' => 1,
            'user_id' => 1,
            'procedure_id' => 1
        ]);

        //Tipos de competencia
        CompetitionType::create([
            'name' => 'ESTATAL'
        ]);

        //Tipos de competencia
        CompetitionType::create([
            'name' => 'NACIONAL'
        ]);

        //Tipos de competencia
        CompetitionType::create([
            'name' => 'INTERNACIONAL'
        ]);

        JustificationTypes::create([
            'name' => 'viáticos'
        ]);

        JustificationTypes::create([
            'name' => 'transporte'
        ]);

        JustificationTypes::create([
            'name' => 'hospedaje'
        ]);

        //Usuario
        Aplicant::create([
            'curp' => 'HECB000817HMNRSNA5',
            'email' => 'ivan1516hc@gmail.com',
            'password' => '150870266',
            'email_verified_at' => '2024-04-16 11:36:08'
        ]);

        DocumentProcedure::create([
            'name' => 'Curriculum Deportivo',
            'descripcion' => 'Test',
            'force' => 1,
            'procedure_id' => 1,
        ]);

        DocumentProcedure::create([
            'name' => 'Identificación oficial',
            'descripcion' => 'Test',
            'force' => 1,
            'procedure_id' => 1
        ]);

        DocumentProcedure::create([
            'name' => 'Comprobante de domicilio',
            'descripcion' => 'Test',
            'force' => 1,
            'procedure_id' => 1
        ]);

        DocumentProcedure::create([
            'name' => 'Convocatoria',
            'descripcion' => 'Test',
            'force' => 1,
            'procedure_id' => 1
        ]);

        DocumentProcedure::create([
            'name' => 'CURP',
            'descripcion' => 'Test',
            'force' => 1,
            'procedure_id' => 1
        ]);

        DocumentProcedure::create([
            'name' => 'Fotografía',
            'descripcion' => 'Test',
            'force' => 1,
            'procedure_id' => 1
        ]);
    }
}

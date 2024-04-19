<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Announcement;
use App\Models\Aplicant;
use App\Models\CompetitionType;
use App\Models\Discipline;
use App\Models\DocumentProcedure;
use App\Models\MessageMotive;
use App\Models\Procedure;
use App\Models\Role;
use App\Models\StatusRequest;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // Lista de deportes olímpicos
        $deportesOlimpicos = [
            'Atletismo',
            'Bádminton',
            'Baloncesto',
            'Balonmano',
            'Béisbol',
            'Boxeo',
            'Canotaje',
            'Ciclismo',
            'Clavados',
            'Ecuestre',
            'Esgrima',
            'Fútbol',
            'Gimnasia',
            'Golf',
            'Halterofilia',
            'Hockey sobre césped',
            'Judo',
            'Karate',
            'Lucha',
            'Natación',
            'Pentatlón moderno',
            'Remo',
            'Rugby',
            'Saltos ecuestres',
            'Skateboarding',
            'Surf',
            'Taekwondo',
            'Tenis',
            'Tenis de mesa',
            'Tiro',
            'Triatlón',
            'Vela',
            'Voleibol',
        ];

        // Crear un registro para cada deporte olímpico
        foreach ($deportesOlimpicos as $deporte) {
            Discipline::create([
                'name' => $deporte
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
            'password' =>  bcrypt('123456'),
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

        //Usuario
        Aplicant::create([
            'curp' => 'HECB000817HMNRSNA5',
            'email' => 'ivan1516hc@gmail.com',
            'password' =>  bcrypt('123456'),
            'email_verified_at' => '2024-04-16 11:36:08'
        ]);

        DocumentProcedure::create([
            'name' => 'Curriculum Vitae',
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

<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Discipline;
use App\Models\DocumentType;
use App\Models\Form;
use App\Models\MessageMotive;
use App\Models\Procedure;
use App\Models\Role;
use App\Models\StatusRequest;
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

        Role::create([
            'name'  => 'PROCEDURE ADMIN',
        ]);
        Role::create([
            'name'  => 'GENERAL ADMIN',
        ]);

        Procedure::create([
            'name' => 'SPORTS SCHOLARSHIPS'
        ]);

        
        

        // Form::create([
        //     'name' => 'INFANTE',
        //     'procedure_id' => 2,
        //     'description' => '',
        //     'url' => '/beneficiario'
        // ]);
        // Form::create([
        //     'name' => 'PADRES/TUTORES',
        //     'procedure_id' => 2,
        //     'description' => '',
        //     'url' => '/padres'
        // ]);
        // Form::create([
        //     'name' => 'DOCUMENTACIÓN',
        //     'procedure_id' => 2,
        //     'description' => '',
        //     'url' => '/documentos'
        // ]);


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

        DocumentType::create([
            'name' => 'INE',
            'descripcion' => 'IMAGEN DE INE FRONTAL Y TRASERA.'
        ]);
        DocumentType::create([
            'name' => 'DOCUMENTO CISZ',
            'descripcion' => 'DOCUMENTO LLENADO.'
        ]);
        DocumentType::create([
            'name' => 'IDENTIFICACIÓN DE EMPLEADO',
            'descripcion' => 'IDENTIFICACIÓN DE EMPLEADO O INE FRONTRAL.'
        ]);

    }
}

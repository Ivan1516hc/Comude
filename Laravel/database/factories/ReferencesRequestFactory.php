<?php

namespace Database\Factories;

use App\Models\Requests;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReferencesRequest>
 */
class ReferencesRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre'=>$this->faker->firstName(),
            'domicilio'=>$this->faker->streetName(),
            // 'codigo'=>44700,
            // 'municipio'=>$this->faker->city(),
            // 'colonia'=>57802,
            'telefono'=>3331974977,
            'request_id'=>Requests::all()->random()->id,
        ];
    }
}

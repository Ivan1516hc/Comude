<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\Beneficiary;
use App\Models\Questions;
use App\Models\Requests;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Answer>
 */
class AddressFactory extends Factory
{
    protected $model = Address::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'calle' => $this->faker->streetName(),
            'numext' => $this->faker->numberBetween(100, 9999),
            'numint' => $this->faker->numberBetween(1, 15),
            'primercruce' => $this->faker->streetName(),
            'segundocruce' => $this->faker->streetName(),
            'vivienda' => $this->faker->numberBetween(1, 5),
            'municipio' => $this->faker->city(),
            'codigopostal' => 44700,
            'colonia' => 57802,
            'celular' => '3331974977',
            'lat' => $this->faker->latitude(20.632551942249567,20.74528704095295),
            'lng' => $this->faker->longitude(-103.45832458337084,-103.3876),
        ];
    }
}

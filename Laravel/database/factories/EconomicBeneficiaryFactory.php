<?php

namespace Database\Factories;

use App\Models\Beneficiary;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EconomicBeneficiary>
 */
class EconomicBeneficiaryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $horarios = ['08:00', '10:00', '14:00', '16:00'];
        return [
            'ocupacion' => $this->faker->randomElement([1, 7]),
            'lugar_nacimiento' => $this->faker->city(),
            'estado_civil' => $this->faker->randomElement([1, 0]),
            'estado_religioso' => $this->faker->randomElement([1, 0]),
            'trabaja' => $this->faker->randomElement([1, 0]),
            'lugar_trabajo' => $this->faker->streetName(),
            'calle_trabajo' => $this->faker->streetName(),
            'telefono_trabajo' => 3331974977,
            'jefe_inmediato' => $this->faker->firstName(),
            'codigo_trabajo' => 44700,
            'colonia_trabajo' => 57802,
            'municipio_trabajo' => $this->faker->city(),
            'entrada_trabajo' => $this->faker->randomElement($horarios),
            'salida_trabajo' => $this->faker->randomElement($horarios),
            'ingreso_mensual' => $this->faker->numberBetween(5000, 30000),
            'beneficiary_id' => Beneficiary::all()->random()->id,
            'puesto' => $this->faker->streetName(),
            'antiguedad' => $this->faker->numberBetween(5, 30),
            'numext_trabajo' => $this->faker->numberBetween(100, 9999),
            'primer_cruce_trabajo' => $this->faker->streetName(),
            'segundo_cruce_trabajo' => $this->faker->streetName(),
        ];
    }
}

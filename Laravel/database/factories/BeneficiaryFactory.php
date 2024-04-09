<?php

namespace Database\Factories;

use App\Models\Beneficiary;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Beneficiary>
 */
class BeneficiaryFactory extends Factory
{
    protected $model = Beneficiary::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'curp' => strtoupper($this->faker->randomLetter . $this->faker->randomLetter . $this->faker->randomDigit . $this->faker->randomDigit . $this->faker->randomLetter . $this->faker->randomLetter . $this->faker->randomDigit . $this->faker->randomDigit . $this->faker->randomDigit . $this->faker->randomDigit . $this->faker->randomLetter . $this->faker->randomLetter . $this->faker->randomDigit . $this->faker->randomDigit . $this->faker->randomDigit . $this->faker->randomDigit . $this->faker->randomDigit),
            'nombre' => $this->faker->firstName(),
            'apaterno' => $this->faker->lastName(),
            'amaterno' => $this->faker->lastName(),
            'escolaridad' => $this->faker->randomElement([1, 17, 18, 3]),
            'fechanacimiento' => $this->faker->dateTimeBetween('-10 years', now()),
            'lenguamaterna' => 3,
            'serviciosmedicos' => 16,
            'sexo' => $this->faker->numberBetween(1, 2),
            'edad' => $this->faker->numberBetween(1, 8),
            'tipo_sangre' => 'O+',
            'enfermedad' => 78,
            'status' => 1
        ];
    }
}

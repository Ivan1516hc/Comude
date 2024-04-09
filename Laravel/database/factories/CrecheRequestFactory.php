<?php

namespace Database\Factories;

use App\Models\Creche;
use App\Models\Degree;
use App\Models\Requests;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CrecheRequest>
 */
class CrecheRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'creche_id' => Creche::all()->random()->id,
            'request_id' => Requests::all()->unique()->random()->id,
            'degree_id' => Degree::all()->random()->id
        ];
    }
}

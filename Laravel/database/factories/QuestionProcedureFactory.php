<?php

namespace Database\Factories;

use App\Models\Procedure;
use App\Models\QuestionProcedure;
use App\Models\Questions;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\QuestionProcedure>
 */
class QuestionProcedureFactory extends Factory
{
    protected $model = QuestionProcedure::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'question_id' => Questions::all()->random()->id,
            'procedure_id' => Procedure::all()->random()->id,
        ];
    }
}

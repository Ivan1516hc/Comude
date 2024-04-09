<?php

namespace Database\Factories;

use App\Models\DocumentType;
use App\Models\Procedure;
use App\Models\RequiredDocument;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RequiredDocument>
 */
class RequiredDocumentFactory extends Factory
{
    protected $model = RequiredDocument::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'procedure_id' => Procedure::all()->random()->id,
            'document_type_id' => DocumentType::all()->random()->id,
            'forced' => $this->faker->randomElement([0,1]),
        ];
    }
}

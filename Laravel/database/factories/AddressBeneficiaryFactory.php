<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\AddressBeneficiary;
use App\Models\Beneficiary;
use App\Models\Questions;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Answer>
 */
class AddressBeneficiaryFactory extends Factory
{
    protected $model = AddressBeneficiary::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'address_id' => Address::all()->random()->id,
            'beneficiary_id' => Beneficiary::all()->random()->id,
        ];
    }
}

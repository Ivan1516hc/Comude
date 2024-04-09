<?php

namespace Database\Factories;

use App\Models\Center;
use App\Models\Priority;
use App\Models\Procedure;
use App\Models\Requests;
use App\Models\StatusRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Request>
 */
class RequestsFactory extends Factory
{
    protected $model = Requests::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::all()->random()->id,
            'procedure_id' => Procedure::all()->random()->id,
            'priority_id' => Priority::all()->random()->id,
            'center_id' => Center::all()->random()->id,
            'status_request_id' => StatusRequest::all()->random()->id,
        ];
    }
}

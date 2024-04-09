<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('competitions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->date('start_date');
            $table->date('ending_date');
            $table->string('classify')->nullable();
            $table->string('justification');
            $table->unsignedInteger('requested_budget');
            $table->unsignedInteger('approved_budget')->nullable();

            $table->unsignedTinyInteger('country_id');
            $table->foreign('country_id')->references('id')->on('countries');

            $table->unsignedSmallInteger('countries_state_id');
            $table->foreign('countries_state_id')->references('id')->on('countries_states');

            $table->unsignedSmallInteger('competition_type_id');
            $table->foreign('competition_type_id')->references('id')->on('competition_types');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competitions');
    }
};

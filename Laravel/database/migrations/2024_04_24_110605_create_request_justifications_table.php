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
        Schema::create('request_justifications', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->string('file_name');

            $table->unsignedTinyInteger('justification_type_id');
            $table->foreign('justification_type_id')->references('id')->on('justification_types');

            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('requests');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_justifications');
    }
};

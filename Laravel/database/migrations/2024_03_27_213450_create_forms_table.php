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
        Schema::create('forms', function (Blueprint $table) {
            $table->tinyIncrements('id');

            $table->string('name');

            $table->unsignedTinyInteger('procedure_id')->nullable();
            $table->foreign('procedure_id')->references('id')->on('procedures');

            $table->string('description');
            $table->string('url');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forms');
    }
};

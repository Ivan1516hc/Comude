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
        Schema::create('important_archievements', function (Blueprint $table) {
            $table->bigIncrements('id'); //AI Unsigned Tinyint

            $table->string('description');
            $table->string('file_name');

            $table->unsignedBigInteger('aplicant_id');
            $table->foreign('aplicant_id')->references('id')->on('aplicants');

            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('important_archievements');
    }
};

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
        Schema::create('logs', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedTinyInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');

            $table->unsignedBigInteger('aplicant_id');
            $table->foreign('aplicant_id')->references('id')->on('aplicants');

            $table->unsignedBigInteger('request_id')->nullable();
            $table->foreign('request_id')->references('id')->on('requests');

            $table->string('action');
            $table->text('description');
            $table->boolean('status')->default(0);
            $table->boolean('read')->default(0);
            $table->json('details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};

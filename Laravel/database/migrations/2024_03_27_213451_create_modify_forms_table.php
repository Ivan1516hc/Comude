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
        Schema::create('modify_forms', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('request_id')->nullable();
            $table->foreign('request_id')->references('id')->on('requests');

            $table->unsignedTinyInteger('form_id')->nullable();
            $table->foreign('form_id')->references('id')->on('forms');

            $table->unsignedBigInteger('history_message_id')->nullable();
            $table->foreign('history_message_id')->references('id')->on('history_messages');

            $table->boolean('status')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modify_forms');
    }
};

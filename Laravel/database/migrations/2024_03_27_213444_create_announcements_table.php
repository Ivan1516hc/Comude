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
        Schema::create('announcements', function (Blueprint $table) {
            $table->bigIncrements('id'); //AI Unsigned Tinyint

            $table->string('name');
            $table->unsignedInteger('start_budget');
            $table->date('start_date');
            $table->date('ending_date');
            $table->boolean('status');


            $table->unsignedTinyInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');

            $table->unsignedTinyInteger('procedure_id');
            $table->foreign('procedure_id')->references('id')->on('procedures');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};

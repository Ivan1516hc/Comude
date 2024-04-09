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
        Schema::create('users', function (Blueprint $table) {

            $table->tinyIncrements('id'); //AI Unsigned Tinyint
            $table->string('name');

            $table->unsignedTinyInteger('role_id')->default(1);
            $table->foreign('role_id')->references('id')->on('roles');

            $table->unsignedTinyInteger('procedure_id')->default(1);
            $table->foreign('procedure_id')->references('id')->on('procedures');

            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('verification_token')->nullable();
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
        Schema::dropIfExists('users');
    }
};

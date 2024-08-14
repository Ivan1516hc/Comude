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
        Schema::create('aplicants', function (Blueprint $table) {
            $table->bigIncrements('id'); //AI Unsigned Tinyint

            $table->string('name')->nullable();
            $table->string('email');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            $table->string('phone_number')->nullable();
            $table->string('second_phone_number')->nullable();
            $table->string('curp')->unique();
            $table->string('rfc')->nullable();
            $table->string('birtdate')->nullable();
            $table->string('gender')->nullable();
            $table->string('verification_token')->nullable();

            $table->boolean('read_regulations')->default(0);

            // $table->unsignedBigInteger('bank_account_id')->nullable();
            // $table->foreign('bank_account_id')->references('id')->on('bank_accounts');

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
        Schema::dropIfExists('aplicants');
    }
};

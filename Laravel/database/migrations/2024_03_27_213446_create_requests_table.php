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
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->string('invoice')->nullable();
            $table->date('finished')->nullable();
            $table->string('modality');
            $table->unsignedSmallInteger('discipline_id');
            $table->foreign('discipline_id')->references('id')->on('disciplines');

            $table->unsignedBigInteger('announcement_id');
            $table->foreign('announcement_id')->references('id')->on('announcements');

            $table->unsignedTinyInteger('status_request_id')->default(1);
            $table->foreign('status_request_id')->references('id')->on('status_requests');

            $table->unsignedBigInteger('competition_id')->nullable();
            $table->foreign('competition_id')->references('id')->on('competitions');

            $table->unsignedBigInteger('aplicant_id');
            $table->foreign('aplicant_id')->references('id')->on('aplicants');

            $table->unsignedBigInteger('bank_account_id')->nullable();
            $table->foreign('bank_account_id')->references('id')->on('bank_accounts');

            $table->boolean('notification_received')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};

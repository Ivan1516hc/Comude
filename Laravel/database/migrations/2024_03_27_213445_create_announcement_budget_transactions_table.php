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
        Schema::create('announcement_budget_transactions', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedTinyInteger('type_budget_id');
            $table->foreign('type_budget_id')->references('id')->on('type_budget_transactions');

            $table->unsignedBigInteger('announcement_id');
            $table->foreign('announcement_id')->references('id')->on('announcements');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcement_budget_transactions');
    }
};

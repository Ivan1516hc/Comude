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
        Schema::create('document_modifies', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('modify_form_id');
            $table->foreign('modify_form_id')->references('id')->on('modify_forms');

            $table->unsignedTinyInteger('document_procedure_id');
            $table->foreign('document_procedure_id')->references('id')->on('document_procedures');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_modifies');
    }
};

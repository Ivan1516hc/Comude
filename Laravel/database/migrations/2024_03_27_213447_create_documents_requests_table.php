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
        Schema::create('documents_requests', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('file_name');

            $table->unsignedTinyInteger('document_type_id');
            $table->foreign('document_type_id')->references('id')->on('document_types');

            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('requests');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents_requests');
    }
};

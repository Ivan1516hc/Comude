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
        // Schema::create('addresses', function (Blueprint $table) {
        //     $table->id();

        //     $table->text('calle');
        //     $table->string('numext',5);
        //     $table->string('numint',5)->nullable();
        //     $table->text('primercruce');
        //     $table->text('segundocruce')->nullable();
        //     $table->integer('vivienda')->nullable();
        //     $table->double('lat')->nullable();
        //     $table->double('lng')->nullable();
        //     $table->string('municipio'); 
        //     $table->string('estado');
        //     $table->integer('codigopostal');
        //     $table->text('colonia');
        //     $table->text('colonia_name');
        //     $table->string('celular');

        //     $table->timestamps();
        //     $table->softDeletes();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};

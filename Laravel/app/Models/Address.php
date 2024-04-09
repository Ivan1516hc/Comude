<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $fillable = [
        'calle',
        'numext',
        'numint',
        'primercruce',
        'segundocruce',
        'vivienda',
        'lat',
        'lng',
        'municipio',
        'codigopostal',
        'colonia',
        'celular',
        'estado',
        'colonia_name'
    ];

    protected $casts = [
        'created_at'  => 'date:Y-m-d',
        'updated_at' => 'datetime:Y-m-d H:00',
    ];


    public function beneficiaries()
    {
        return $this->belongsToMany(Beneficiary::class, 'address_beneficiaries', 'address_id', 'beneficiary_id');
    }

    public function setAttribute($key, $value)
    {
        parent::setAttribute($key, $value);

        if (is_string($value))
            $this->attributes[$key] = trim(mb_strtoupper($value));
    }
}

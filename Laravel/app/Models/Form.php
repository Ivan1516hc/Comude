<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'procedure_id',
        'description',
        'url'
    ];

    public function procedure()
    {
        return $this->hasOne('App\Models\Procedure', 'id', 'procedure_id');
    }

    public function setAttribute($key, $value)
    {
        parent::setAttribute($key, $value);

        $this->attributes[$key] = trim(mb_strtoupper($value));
    }
}

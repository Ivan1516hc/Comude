<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'aplicant_id',
        'request_id',
        'action',
        'description',
        'status',
        'read',
        'details'
    ];

    public function user()
    {
        return $this->hasOne('App\Models\User', 'id', 'user_id');
    }

    public function setAttribute($key, $value)
    {
        parent::setAttribute($key, $value);

        $this->attributes[$key] = trim(mb_strtoupper($value));
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageMotive extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];

    protected $casts = [
        'created_at'  => 'date:Y-m-d',
        'updated_at' => 'datetime:Y-m-d H:00',
    ];

    public function history_message()
    {
        return $this->hasMany('App\Models\HistoryMessage', 'id', 'request_id');
    }

    public function setAttribute($key, $value)
    {
        parent::setAttribute($key, $value);

        if (is_string($value))
            $this->attributes[$key] = trim(mb_strtoupper($value));
    }
}

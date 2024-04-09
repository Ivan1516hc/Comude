<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requests extends Model
{
    use HasFactory;
    protected $fillable = [
        'invoice',
        'finished',
        'discipline_id',
        'announcement_id',
        'status_request_id',
        'competition_id',
        'aplicant_id'
    ];

    protected $casts = [
        'created_at'  => 'date:Y-m-d',
        'updated_at' => 'datetime:Y-m-d H:00',
    ];

    public function competition()
    {
        return $this->belongsTo(Competition::class, 'competition_id', 'id');
    }

    public function modify_forms()
    {
        return $this->hasMany(ModifyForm::class, 'request_id', 'id');
    }

    public function setAttribute($key, $value)
    {
        parent::setAttribute($key, $value);

        if (is_string($value))
            $this->attributes[$key] = trim(mb_strtoupper($value));
    }
}

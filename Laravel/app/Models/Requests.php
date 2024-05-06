<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Requests extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable = [
        'invoice',
        'modality',
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

    public function aplicant()
    {
        return $this->belongsTo(Aplicant::class, 'aplicant_id', 'id');
    }

    public function status_request()
    {
        return $this->belongsTo(StatusRequest::class, 'status_request_id', 'id');
    }

    public function announcement()
    {
        return $this->belongsTo(Announcement::class, 'announcement_id', 'id');
    }

    public function discipline()
    {
        return $this->belongsTo(Discipline::class, 'discipline_id', 'id');
    }

    public function documents()
    {
        return $this->hasMany(DocumentsRequest::class, 'request_id', 'id');
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

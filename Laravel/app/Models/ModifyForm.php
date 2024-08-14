<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModifyForm extends Model
{
    use HasFactory;
    protected $fillable = [
        'request_id',
        'form_id',
        'history_message_id',
        'status'
    ];

    public function request()
    {
        return $this->hasOne('App\Models\Requests', 'id', 'request_id');
    }

    public function form()
    {
        return $this->hasOne('App\Models\Form', 'id', 'form_id');
    }

    public function document_modify()
    {
        return $this->hasMany('App\Models\DocumentModify', 'modify_form_id', 'id');
    }

    public function history_message()
    {
        return $this->hasOne('App\Models\HistoryMenssage', 'id', 'history_message_id');
    }

    public function setAttribute($key, $value)
    {
        parent::setAttribute($key, $value);

        $this->attributes[$key] = trim(mb_strtoupper($value));
    }
}

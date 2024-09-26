<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentModify extends Model
{
    use HasFactory;
    protected $fillable = [
        'modify_form_id',
        'document_procedure_id',
    ];

    protected $casts = [
        'created_at'  => 'date:Y-m-d',
        'updated_at' => 'datetime:Y-m-d H:00',
    ];

    public function document_procedure()
    {
        return $this->hasMany(DocumentProcedure::class, 'id', 'document_procedure_id');
    }

    public function modify_form()
    {
        return $this->hasOne(ModifyForm::class, 'id', 'modify_form_id');
    }


    public function setAttribute($key, $value)
    {
        parent::setAttribute($key, $value);

        if (is_string($value))
            $this->attributes[$key] = trim(mb_strtoupper($value));
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentsRequest extends Model
{
    use HasFactory;
    protected $fillable = [
        'file_name',
        'document_procedure_id',
        'request_id',
    ];

    protected $casts = [
        'created_at'  => 'date:Y-m-d',
        'updated_at' => 'datetime:Y-m-d H:00',
    ];

    public function requests()
    {
        return $this->hasMany(Requests::class, 'id', 'request_id');
    }

    public function procedure()
    {
        return $this->belongsTo(Procedure::class, 'document_procedure_id', 'id');
    }

    public function document_procedure()
    {
        return $this->belongsTo(DocumentProcedure::class, 'document_procedure_id', 'id');
    }


    public function setAttribute($key, $value)
    {
        parent::setAttribute($key, $value);

        if (is_string($value) && $key != 'file_name')
            $this->attributes[$key] = trim(mb_strtoupper($value));
    }
}

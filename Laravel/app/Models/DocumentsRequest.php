<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentsRequest extends Model
{
    use HasFactory;
    protected $fillable = [
        'file_name',
        'type_document_id',
        'request_id',
    ];

    protected $casts = [
        'created_at'  => 'date:Y-m-d',
        'updated_at' => 'datetime:Y-m-d H:00',
    ];

    public function setAttribute($key, $value)
    {
        parent::setAttribute($key, $value);

        if (is_string($value))
            $this->attributes[$key] = trim(mb_strtoupper($value));
    }
}

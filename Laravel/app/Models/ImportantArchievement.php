<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ImportantArchievement extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'description',
        'file_name',
        'aplicant_id'
    ];

    protected $casts = [
        'created_at'  => 'date:Y-m-d',
        'updated_at' => 'datetime:Y-m-d H:00',
    ];

    public function setAttribute($key, $value)
    {
        parent::setAttribute($key, $value);

        if (is_string($value) && $key != 'file_name')
            $this->attributes[$key] = trim(mb_strtoupper($value));
    }
}

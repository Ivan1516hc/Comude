<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    use HasFactory;
    protected $fillable = [
        // 'account',
        'key_account',
        'titular_persona_name',
        'bank',
        'account_status_url'
    ];

    protected $casts = [
        'created_at'  => 'date:Y-m-d',
        'updated_at' => 'datetime:Y-m-d H:00',
    ];

    public function request()
    {
        return $this->belongsTo(Requests::class, 'id','bank_account_id' );
    }

    public function setAttribute($key, $value)
    {
        parent::setAttribute($key, $value);

        if (is_string($value) && $key != 'account_status_url')
            $this->attributes[$key] = trim(mb_strtoupper($value));
    }
}

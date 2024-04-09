<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'role_id',
        'procedure_id',
        'email',
        'password',
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime:Y-m-d H:00',
        'created_at'  => 'date:Y-m-d',
        'updated_at' => 'datetime:Y-m-d H:00',
    ];

    // Mutador para cifrar la contraseña al guardarla en la base de datos
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function role()
    {
        return $this->hasOne('App\Models\Role', 'id', 'role_id');
    }

    public function logs()
    {
        return $this->hasMany('App\Models\Log', 'user_id', 'id');
    }


    public function setAttribute($key, $value)
    {
        parent::setAttribute($key, $value);

        if (is_string($value) && $key != 'password')
            $this->attributes[$key] = trim(mb_strtoupper($value));
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competition extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'country_id',
        'countries_state_id',
        'start_date',
        'ending_date',
        'classify',
        'justification',
        'requested_budget',
        'approved_budget',
        'competition_type_id'
    ];

    protected $casts = [
        'created_at'  => 'date:Y-m-d',
        'updated_at' => 'datetime:Y-m-d H:00',
    ];

    public function request()
    {
        return $this->belongsTo(Requests::class, 'id','competition_id' );
    }

    public function competition_type()
    {
        return $this->belongsTo(CompetitionType::class, 'competition_type_id', 'id');
    }

    public function state()
    {
        return $this->belongsTo(CountriesStates::class, 'countries_state_id', 'id');
    }
    public function country()
    {
        return $this->belongsTo(Countries::class, 'country_id', 'id');
    }

    public function setAttribute($key, $value)
    {
        parent::setAttribute($key, $value);

        if (is_string($value))
            $this->attributes[$key] = trim(mb_strtoupper($value));
    }
}

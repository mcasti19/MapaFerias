<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feria extends Model
{
    use HasFactory;
    protected $table = 'feria';
    protected $primaryKey = 'id_feria';
    protected $fillable = [
     'id_state',
     'id_municipality', 
     'id_parish',
     'date',
     'sector',
     'mission_base',
     'clap',
     'circuit',
     'coordinates',
     'full_name',
     'cedula',
     'phone',
     'compliance',
     'bm',
     'emblematic',
     'observations'
     
     ];

    public function state(): BelongsTo
    {
        return $this->belongsTo(State::class, 'id_state', 'id_state');
    }

    public function municipality(): BelongsTo
    {
        return $this->belongsTo(Municipality::class, 'id_municipality', 'id_municipality');
    }

    public function parish(): BelongsTo
    {
        return $this->belongsTo(Parish::class, 'id_parish', 'id_parish');
    }
}

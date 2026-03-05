<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Municipalities extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'id_municipality';
    protected $fillable = [
        'name_municipality',
        'id_state',
    ];

    public function state(): BelongsTo
    {
        return $this->belongsTo(States::class, 'id_state', 'id_state');
    }
   protected $table = 'municipalities';
}

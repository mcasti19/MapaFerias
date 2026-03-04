<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Parishes extends Model
{
    use HasFactory;

    protected $table = 'parishes';
    protected $primaryKey = 'id_parish';
    protected $fillable = [
        'parish',
        'id_municipality',
    ];

    public function municipality(): BelongsTo
    {
        return $this->belongsTo(Municipalities::class, 'id_municipality', 'id_municipality');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Distributed extends Model
{
    protected $table = 'distributed';
    protected $primaryKey = 'id_distributed';
    protected $fillable = [
        'id_item',
        'id_feria',
        'tons',
    ];

    public function item(): BelongsTo
    {
        return $this->hasMany(Item::class, 'id_item', 'id_item');
    }

    public function feria(): BelongsTo
    {
        return $this->belongsTo(Feria::class, 'id_feria', 'id_feria');
    }
}

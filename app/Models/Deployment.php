<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deployment extends Model
{
    protected $table = 'deployment';
    protected $primaryKey = 'id_deployment';
    protected $fillable = [
        'month',
        'start_deployment',
        'end_deployment',
        'id_feria'
    ];

    public function feria()
    {
        return $this->belongsTo(Feria::class, 'id_feria', 'id_feria');
    }
}

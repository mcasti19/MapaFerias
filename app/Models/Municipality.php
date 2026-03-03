<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Municipality extends Model
{
    /** @use HasFactory<\Database\Factories\MunicipalityFactory> */
    use HasFactory;

    protected $table = "municipalities_analitic";

    protected $primaryKey = 'id_municipalities';

    protected $fillable = [
        'id_municipalities',
        'municipalities',
        'id_states'
    ];
}

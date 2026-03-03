<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parish extends Model
{
    /** @use HasFactory<\Database\Factories\ParishFactory> */
    use HasFactory;

    protected $table = "parishes_analitic";

    protected $primaryKey = 'id_parishes';

    protected $fillable = [
        'id_parishes',
        'parishes'
    ];
}

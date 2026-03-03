<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class States extends Model
{
    /** @use HasFactory<\Database\Factories\StatesFactory> */
    use HasFactory;

    protected $table = "states_analitic";

    protected $primaryKey = 'id_state';

    protected $fillable = [
        'state'
    ];
}

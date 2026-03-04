<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class States extends Model
{
   use HasFactory;
    
    protected $table = 'state';
    protected $primaryKey = 'id_state';
    protected $fillable = [
        'name_state',
    ];
}

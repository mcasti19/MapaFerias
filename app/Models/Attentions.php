<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Attentions extends Model
{   
    use HasFactory;
    protected $table = 'attentions';
    
    protected $primaryKey = 'id_attentions';
    
    protected $fillable = [
     'clap',
     'family', 
     'proteicos', 
     'id_feria'
     ];

    public function feria()
    {
        return $this->belongsTo(Feria::class, 'id_feria', 'id_feria');
    }
}

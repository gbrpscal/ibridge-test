<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Operador extends Model
{
    protected $table = 'operadores';

    protected $fillable = [
        'id',
        'nome'
    ];

    public $incrementing = false;
    protected $keyType = 'int';
}

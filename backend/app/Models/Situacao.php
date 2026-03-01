<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Situacao extends Model
{
    protected $table = 'situacoes';

    protected $fillable = [
        'id',
        'nome'
    ];

    public $incrementing = false;
    protected $keyType = 'int';
}

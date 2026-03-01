<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contato extends Model
{
    protected $fillable = [
        'id',
        'nome',
        'telefone'
    ];

    public $incrementing = false;
    protected $keyType = 'int';
}

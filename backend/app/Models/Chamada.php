<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chamada extends Model
{
    protected $fillable = [
        'id',
        'datahora',
        'contato_id',
        'lista_id',
        'campanha_id',
        'operador_id',
        'situacao_id',
        'categoria_id'
    ];

    public $incrementing = false;
    protected $keyType = 'int';
}

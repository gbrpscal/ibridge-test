<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lista extends Model
{
    protected $fillable = [
        'id',
        'nome',
        'campanha_id'
    ];

    public $incrementing = false;
    protected $keyType = 'int';
}

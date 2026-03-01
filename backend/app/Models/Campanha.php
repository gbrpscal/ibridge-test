<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campanha extends Model
{
    protected $fillable = [
        'id',
        'nome'
    ];

    public $incrementing = false;
    protected $keyType = 'int';
}

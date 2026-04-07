<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'user_id',
        'category_id',
        'description',
        'deadline',
        'archived',
        'order',
        'color',
    ];

    protected $casts = [
        'archived' => 'boolean',
        'deadline' => 'datetime',
    ];
}

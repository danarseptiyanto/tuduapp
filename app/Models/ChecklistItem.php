<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChecklistItem extends Model
{
    protected $fillable = [
        'task_id',
        'label',
        'is_done',
        'order',
    ];

    protected $casts = [
        'is_done' => 'boolean',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}

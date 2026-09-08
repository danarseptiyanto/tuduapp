<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'user_id',
        'category_id',
        'description',
        'type',
        'deadline',
        'archived',
        'order',
        'color',
    ];

    protected $casts = [
        'archived' => 'boolean',
        'deadline' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function checklistItems()
    {
        return $this->hasMany(ChecklistItem::class)->orderBy('order');
    }

    public function isChecklist(): bool
    {
        return $this->type === 'checklist';
    }
}

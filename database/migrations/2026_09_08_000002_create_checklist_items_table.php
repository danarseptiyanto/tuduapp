<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('checklist_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained()->cascadeOnDelete();
            $table->text('label');
            $table->boolean('is_done')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();

            $table->index(['task_id', 'order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('checklist_items');
    }
};

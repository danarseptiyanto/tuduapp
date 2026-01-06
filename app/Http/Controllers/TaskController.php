<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;

class TaskController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        return Inertia::render('Tasks/Index', [
            'tasks' => Task::where('user_id', $user->id)
                ->where('archived', false)
                ->orderBy('order')
                ->get(),
            'categories' => $user->categories,
            'archivedTasks' => Task::where('user_id', auth()->id())
                ->where('archived', true)
                ->orderByDesc('updated_at')
                ->limit(5)
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $userId = auth()->id();

        // Default "General" category
        $categoryId = $request->category_id;
        if (!$categoryId) {
            $categoryId = Category::where('user_id', $userId)
                ->where('name', 'General')
                ->value('id');
        }

        // 🎨 Random color
        $colors = ['orange', 'lime', 'sky', 'violet', 'fuchsia', 'pink', 'zinc', 'purple', 'emerald', 'green'];
        $randomColor = $colors[array_rand($colors)];

        // Shift existing tasks
        Task::where('user_id', $userId)
            ->where('archived', false)
            ->increment('order');

        // Create new task at top
        Task::create([
            'user_id' => $userId,
            'category_id' => $categoryId,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'archived' => false,
            'order' => 1,
            'color' => $randomColor,   // 👈 persisted
        ]);

        return redirect()->back();
    }



    public function update(Task $task, Request $request)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $task->update(
            $request->validate([
                'description' => 'nullable|string',
                'deadline' => 'nullable|date',
            ])
        );

        return back();
    }

    public function destroy(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }
        $task->delete();

        return back();
    }

    public function archive(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $task->update(['archived' => true]);

        return back();
    }

    public function reorder(Request $request)
    {
        foreach ($request->order as $item) {
            Task::where('id', $item['id'])
                ->where('user_id', auth()->id())
                ->update(['order' => $item['order']]);
        }

        return back();
    }
}

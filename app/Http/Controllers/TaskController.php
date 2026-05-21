<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        $query = Task::where('user_id', $user->id)
            ->where('archived', false)
            ->orderBy('order');

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        return Inertia::render('Tasks/Index', [
            'tasks' => $query->with('category')->get(),
            'categories' => $user->categories,
            'archivedTasks' => Task::where('user_id', auth()->id())
                ->where('archived', true)
                ->orderByDesc('updated_at')
                ->limit(5)
                ->get(),
            'user' => $user,
            'filters' => $request->only('category'),
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
            'category_id' => $request->category_id,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'archived' => false,
            'order' => 0,
            'color' => $randomColor,
        ]);

        return redirect()->back()->with('success', 'Task created successfully!');
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
                'category_id' => 'nullable|exists:categories,id',
            ])
        );

        return back()->with('success', 'Task updated successfully!');
    }

    public function destroy(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }
        $task->delete();

        return back()->with('success', 'Task deleted successfully!');
    }

    public function archive(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $task->update(['archived' => true]);

        return back()->with('success', 'Task archived successfully!');
    }

    public function unarchive(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $task->update(['archived' => false]);

        return back()->with('success', 'Task unarchived successfully!');
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

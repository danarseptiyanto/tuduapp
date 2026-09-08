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
            'tasks' => $query->with(['category', 'checklistItems'])->get(),
            'categories' => $user->categories,
            'archivedTasks' => Task::where('user_id', auth()->id())
                ->where('archived', true)
                ->orderByDesc('updated_at')
                ->limit(10)
                ->with(['category', 'checklistItems'])
                ->get(),
            'user' => $user,
            'filters' => $request->only('category'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'nullable|string',
            'type' => 'nullable|in:note,checklist',
            'deadline' => 'nullable|date',
            'category_id' => 'nullable|exists:categories,id',
            'items' => 'nullable|array',
            'items.*.label' => 'required_with:items|string|max:1000',
            'items.*.is_done' => 'nullable|boolean',
        ]);

        $userId = auth()->id();

        // 🎨 Random color
        $colors = ['orange', 'lime', 'sky', 'violet', 'fuchsia', 'pink', 'zinc', 'purple', 'emerald', 'green'];
        $randomColor = $colors[array_rand($colors)];

        // Shift existing tasks
        Task::where('user_id', $userId)
            ->where('archived', false)
            ->increment('order');

        $type = $validated['type'] ?? 'note';

        // Create new task at top
        $task = Task::create([
            'user_id' => $userId,
            'category_id' => $validated['category_id'] ?? null,
            'description' => $validated['description'] ?? null,
            'type' => $type,
            'deadline' => $validated['deadline'] ?? null,
            'archived' => false,
            'order' => 0,
            'color' => $randomColor,
        ]);

        if ($type === 'checklist' && !empty($validated['items'])) {
            $order = 0;
            foreach ($validated['items'] as $item) {
                $label = trim($item['label'] ?? '');
                if ($label === '') {
                    continue;
                }
                $task->checklistItems()->create([
                    'label' => $label,
                    'is_done' => (bool) ($item['is_done'] ?? false),
                    'order' => $order++,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Task created successfully!');
    }

    public function update(Task $task, Request $request)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'description' => 'nullable|string',
            'type' => 'nullable|in:note,checklist',
            'deadline' => 'nullable|date',
            'category_id' => 'nullable|exists:categories,id',
            'items' => 'nullable|array',
            'items.*.id' => 'nullable|integer|exists:checklist_items,id',
            'items.*.label' => 'required_with:items|string|max:1000',
            'items.*.is_done' => 'nullable|boolean',
            'items.*.order' => 'nullable|integer|min:0',
        ]);

        $task->update([
            'description' => $validated['description'] ?? $task->description,
            'type' => $validated['type'] ?? $task->type,
            'deadline' => $validated['deadline'] ?? null,
            'category_id' => $validated['category_id'] ?? null,
        ]);

        $wasChecklist = $task->getOriginal('type') === 'checklist';
        $isChecklistNow = $task->type === 'checklist';

        if (array_key_exists('items', $validated)) {
            // Explicit items payload (possibly empty) → full sync.
            $incoming = $validated['items'] ?? [];
            $keepIds = [];

            foreach (array_values($incoming) as $index => $item) {
                $label = trim($item['label'] ?? '');
                if ($label === '') {
                    continue;
                }
                $order = $item['order'] ?? $index;
                $isDone = (bool) ($item['is_done'] ?? false);

                if (!empty($item['id'])) {
                    $existing = $task->checklistItems()->where('id', $item['id'])->first();
                    if ($existing) {
                        $existing->update([
                            'label' => $label,
                            'is_done' => $isDone,
                            'order' => $order,
                        ]);
                        $keepIds[] = $existing->id;
                    }
                } else {
                    $created = $task->checklistItems()->create([
                        'label' => $label,
                        'is_done' => $isDone,
                        'order' => $order,
                    ]);
                    $keepIds[] = $created->id;
                }
            }

            // Delete items that were removed in the editor.
            $task->checklistItems()->whereNotIn('id', $keepIds)->delete();
        } elseif ($wasChecklist && ! $isChecklistNow) {
            // Converted back to a plain note without an items payload → discard items.
            $task->checklistItems()->delete();
        }
        // Otherwise (e.g. title/deadline-only update): leave items untouched.

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

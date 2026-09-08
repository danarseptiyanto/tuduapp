<?php

namespace App\Http\Controllers;

use App\Models\ChecklistItem;
use App\Models\Task;
use Illuminate\Http\Request;

class ChecklistItemController extends Controller
{
    private function authorizeItem(Task $task, ?ChecklistItem $item = null): void
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }
        if ($item && $item->task_id !== $task->id) {
            abort(404);
        }
    }

    public function store(Task $task, Request $request)
    {
        $this->authorizeItem($task);

        $validated = $request->validate([
            'label' => 'required|string|max:1000',
            'is_done' => 'nullable|boolean',
        ]);

        $maxOrder = $task->checklistItems()->max('order') ?? -1;

        $item = $task->checklistItems()->create([
            'label' => trim($validated['label']),
            'is_done' => (bool) ($validated['is_done'] ?? false),
            'order' => $maxOrder + 1,
        ]);

        // Keep task as checklist once it has items
        if ($task->type !== 'checklist') {
            $task->update(['type' => 'checklist']);
        }

        return back()->with('success', 'Item added.');
    }

    public function update(Task $task, ChecklistItem $item, Request $request)
    {
        $this->authorizeItem($task, $item);

        $validated = $request->validate([
            'label' => 'sometimes|required|string|max:1000',
            'is_done' => 'sometimes|boolean',
            'order' => 'sometimes|integer|min:0',
        ]);

        if (isset($validated['label'])) {
            $validated['label'] = trim($validated['label']);
        }

        $item->update($validated);

        return back()->with('success', 'Item updated.');
    }

    public function toggle(Task $task, ChecklistItem $item)
    {
        $this->authorizeItem($task, $item);

        $item->update(['is_done' => ! $item->is_done]);

        return back();
    }

    public function destroy(Task $task, ChecklistItem $item)
    {
        $this->authorizeItem($task, $item);

        $item->delete();

        return back()->with('success', 'Item deleted.');
    }
}

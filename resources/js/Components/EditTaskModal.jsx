import { useForm } from "@inertiajs/react";
import TaskModal from "./TaskModal";

export default function EditTaskModal({ task, onClose, onDelete }) {
    const form = useForm({
        description: task.description || "",
        deadline: task.deadline ? task.deadline.substring(0, 16) : "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        form.patch(`/tasks/${task.id}`, {
            onSuccess: () => onClose(),
        });
    }

    return (
        <TaskModal title="Edit Task" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                    placeholder="Task description"
                    value={form.data.description}
                    onChange={(e) =>
                        form.setData("description", e.target.value)
                    }
                    rows={10}
                    className="text-heading rounded-base block w-full resize-none rounded-xl border border-gray-300 bg-white p-3.5 text-sm"
                    required
                />

                <div className="flex items-center justify-between gap-2">
                    <button
                        type="button"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => {
                            onDelete(task.id);
                            onClose();
                        }}
                        className="flex h-10 cursor-pointer items-center gap-2 rounded-full bg-red-500 px-5 text-sm font-medium text-white transition-all hover:bg-red-600"
                    >
                        Delete
                    </button>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-10 cursor-pointer items-center gap-2 rounded-full bg-gray-300 px-5 text-sm font-medium transition-all hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex h-10 cursor-pointer items-center gap-2 rounded-full bg-[#F9C974] px-5 text-sm font-medium whitespace-nowrap text-black transition-all hover:bg-gray-400"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
            <div className="absolute bottom-20 flex w-full flex-col-reverse gap-1.5 pr-[44px] pl-[11px]">
                <input
                    type="datetime-local"
                    value={form.data.deadline}
                    onChange={(e) =>
                        form.setData("deadline", e.target.value)
                    }
                    className="text-heading block h-8 rounded-lg border border-gray-300 bg-white px-3 pb-2 text-sm"
                />
                <label
                    htmlFor="deadline"
                    className="text-xs leading-none text-gray-500"
                >
                    Deadline
                </label>
            </div>
        </TaskModal>
    );
}

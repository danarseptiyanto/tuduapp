import { useForm, router } from "@inertiajs/react";
import { useState } from "react";
import TaskModal from "./TaskModal";

export default function CreateTaskModal({ onClose, defaultCategoryId }) {
    const [isCreating, setIsCreating] = useState(false);

    const form = useForm({
        description: "",
        deadline: "",
        category_id: defaultCategoryId || "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        setIsCreating(true);

        form.post("/tasks", {
            preserveScroll: true,
            onSuccess: () => {
                form.reset("description", "deadline");
                onClose();
                router.reload({ only: ["tasks"] });
            },
            onFinish: () => {
                setIsCreating(false);
            },
        });
    }

    return (
        <TaskModal title="Create Task" onClose={onClose}>
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

                <div className="flex items-center justify-end gap-2">
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
                            disabled={isCreating}
                            className={`flex h-10 cursor-pointer items-center gap-2 rounded-full bg-[#F9C974] px-5 text-sm font-medium whitespace-nowrap transition-all hover:bg-gray-400 ${
                                isCreating
                                    ? "cursor-not-allowed bg-gray-400"
                                    : " text-black"
                            }`}
                        >
                            {isCreating ? "Saving..." : "Create Task"}
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

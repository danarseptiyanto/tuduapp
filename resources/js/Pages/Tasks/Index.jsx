import { router, useForm } from "@inertiajs/react";
import {
    DndContext,
    closestCenter,
    useDroppable,
    DragOverlay,
} from "@dnd-kit/core";
import {
    SortableContext,
    rectSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import TaskItem from "@/Components/TaskItem";
import TaskModal from "@/Components/TaskModal";

/* ===================== ARCHIVE ZONE ===================== */
function ArchiveZone() {
    const { setNodeRef, isOver } = useDroppable({ id: "archive" });

    return (
        <div
            ref={setNodeRef}
            className={`rounded border-2 border-dashed p-6 text-center ${
                isOver ? "border-black text-black" : "text-gray-500"
            }`}
        >
            Drop here to archive
        </div>
    );
}

/* ===================== PAGE ===================== */
export default function Index({
    tasks = [],
    categories = [],
    archivedTasks = [],
}) {
    const generalCategory = categories.find((c) => c.name === "General");

    const [isCreating, setIsCreating] = useState(false);

    /* ===== LOCAL STATE FOR OPTIMISTIC UI ===== */
    const [items, setItems] = useState(tasks);
    const [activeTask, setActiveTask] = useState(null);

    const [showCreate, setShowCreate] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        setItems(tasks);
    }, [tasks]);

    /* ===== CREATE FORM ===== */
    const createForm = useForm({
        description: "",
        deadline: "",
        category_id: generalCategory ? generalCategory.id : "",
    });

    function submitCreate(e) {
        e.preventDefault();

        setIsCreating(true); // 🔒 disable button

        createForm.post("/tasks", {
            preserveScroll: true,

            onSuccess: () => {
                createForm.reset("description", "deadline");
                setShowCreate(false);

                router.reload({ only: ["tasks"] });
            },

            onFinish: () => {
                setIsCreating(false); // 🔓 re-enable button (success or error)
            },
        });
    }

    /* ===== EDIT FORM ===== */
    const editForm = useForm({
        description: "",
        deadline: "",
    });

    function openEdit(task) {
        setEditingTask(task);
        editForm.setData({
            description: task.description || "",
            deadline: task.deadline ? task.deadline.split("T")[0] : "",
        });
    }

    function submitEdit(e) {
        e.preventDefault();

        editForm.patch(`/tasks/${editingTask.id}`, {
            onSuccess: () => {
                setEditingTask(null);
            },
        });
    }

    /* ===== DELETE ===== */
    function deleteTask(id) {
        setItems((prev) => prev.filter((t) => t.id !== id)); // optimistic
        router.delete(`/tasks/${id}`);
    }

    /* ===== DND ===== */
    function handleDragStart(event) {
        const task = items.find((t) => t.id === event.active.id);
        setActiveTask(task);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        // ✅ DROP TO ARCHIVE (OPTIMISTIC)
        if (over.id === "archive") {
            setItems((prev) => prev.filter((t) => t.id !== active.id));
            router.post(`/tasks/${active.id}/archive`);
            return;
        }

        // ↕️ SORT REORDER
        if (active.id !== over.id) {
            setItems((prev) => {
                const oldIndex = prev.findIndex((i) => i.id === active.id);
                const newIndex = prev.findIndex((i) => i.id === over.id);

                const newOrder = arrayMove(prev, oldIndex, newIndex);

                // Persist order in DB
                router.post("/tasks/reorder", {
                    order: newOrder.map((t, index) => ({
                        id: t.id,
                        order: index,
                    })),
                });

                return newOrder;
            });
        }
    }

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="bg-[#F8F6F5]">
                <div className="mx-auto flex max-w-[1540px] justify-between">
                    <div className="mx-14 w-[1025px] pt-7">
                        <div className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-xl bg-[#F9C974]">
                            <svg
                                width="22"
                                height="21"
                                viewBox="0 0 22 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M10.5238 3.8147e-06C13.0161 3.8147e-06 15.3029 0.848087 17.1071 2.26603L15.748 5.11532C14.406 3.81806 12.5608 3.02025 10.5272 3.02025C6.4157 3.02025 3.08471 6.28186 3.08471 10.3077C3.08471 13.509 5.19354 16.2276 8.12399 17.2064L6.97372 20.0121C2.91011 18.5841 0.00019455 14.7795 0.00019455 10.3077C0.00019455 4.61586 4.71083 0.003356 10.5238 0.003356V3.8147e-06Z"
                                    fill="black"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M19.2434 4.52869C20.3834 6.17458 21.0509 8.16573 21.0509 10.3044C21.0509 15.9963 16.3403 20.6088 10.5273 20.6088C9.70569 20.6088 8.9046 20.5149 8.13776 20.3406L9.30515 17.4913C9.70226 17.555 10.1097 17.5885 10.5273 17.5885C14.6388 17.5885 17.9698 14.3269 17.9698 10.301C17.9698 9.61384 17.8706 8.94677 17.6891 8.31657L19.2434 4.52534V4.52869Z"
                                    fill="black"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M14.2757 16.5963L12.7249 20.3808C12.2764 20.4747 11.8142 20.5417 11.3452 20.5752C11.3521 20.5752 11.3555 20.5752 11.3624 20.5752L12.718 17.2667C13.2692 17.1025 13.7896 16.8745 14.2791 16.5963H14.2757Z"
                                    fill="black"
                                    fill-opacity="0.14902"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4.26212 18.5874C3.9232 18.3394 3.59797 18.0746 3.28986 17.7896L4.5668 14.6755C4.83041 15.0208 5.12482 15.3392 5.4432 15.6342L4.23815 18.574L4.25869 18.5908L4.26212 18.5874Z"
                                    fill="black"
                                    fill-opacity="0.14902"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M8.4494 8.30317L4.242 18.5707C5.06705 19.1741 5.98453 19.6601 6.9739 20.0054L7.16219 19.5461L11.7736 8.30317H8.45282H8.4494ZM11.3593 20.5752L12.715 17.2667L16.8231 7.24726L18.3808 3.44597L19.6098 0.449181H16.3301L16.2891 0.452533L15.8885 1.43135L14.7211 4.28064L9.30526 17.4879L8.13787 20.3372C8.90472 20.5116 9.69895 20.6021 10.5206 20.6054C10.6096 20.6054 10.6986 20.6054 10.7876 20.6021H10.8013C10.8835 20.5987 10.9656 20.5954 11.0478 20.592L11.0854 20.5886C11.1608 20.5853 11.2326 20.5786 11.308 20.5752C11.3251 20.5752 11.3422 20.5719 11.3593 20.5719V20.5752Z"
                                    fill="black"
                                />
                            </svg>
                        </div>
                        <div className="mx-auto space-y-8 py-9">
                            {/* HEADER */}
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-semibold">
                                    Hi Danar Septiyanto 👋
                                </h1>
                                <button
                                    onClick={() => setShowCreate(true)}
                                    disabled={isCreating}
                                    className={`flex h-[40px] cursor-pointer items-center gap-2 rounded-full bg-gray-300 px-5 text-sm font-medium transition-all hover:bg-gray-400 ${
                                        isCreating
                                            ? "cursor-not-allowed bg-gray-400"
                                            : "bg-black"
                                    }`}
                                >
                                    {isCreating ? (
                                        <>
                                            <svg
                                                className="h-4 w-4 animate-spin text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                ></path>
                                            </svg>
                                            Creating...
                                        </>
                                    ) : (
                                        "Add Task"
                                    )}
                                </button>
                            </div>

                            {/* SORTABLE LIST */}
                            <SortableContext
                                items={items.map((t) => t.id)}
                                strategy={rectSortingStrategy}
                            >
                                <div className="grid grid-cols-4 gap-7">
                                    {items.length === 0 && (
                                        <p className="text-sm text-gray-500">
                                            No tasks yet.
                                        </p>
                                    )}

                                    {items.map((task) => (
                                        <TaskItem
                                            key={task.id}
                                            task={task}
                                            onEdit={openEdit}
                                            onDelete={deleteTask}
                                        />
                                    ))}
                                </div>
                            </SortableContext>

                            {/* ARCHIVE DROP ZONE */}
                            <ArchiveZone />
                        </div>

                        {/* DRAG PREVIEW */}
                        <DragOverlay>
                            {activeTask ? (
                                <div className="aspect-square cursor-grab rounded-[18px] bg-white/40 p-6 backdrop-blur-md select-none">
                                    {activeTask.description && (
                                        <p className="text-[15px] leading-snug text-gray-800">
                                            {activeTask.description}
                                        </p>
                                    )}
                                </div>
                            ) : null}
                        </DragOverlay>

                        <div className="mt-8">
                            <h2 className="mb-3 text-lg font-semibold text-gray-700">
                                Recently Archived
                            </h2>

                            {archivedTasks.length === 0 ? (
                                <p className="text-sm text-gray-500">
                                    No archived tasks yet.
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {archivedTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="rounded-lg bg-gray-100 p-3 text-sm opacity-80"
                                        >
                                            <p className="font-medium text-gray-800 line-through">
                                                {task.description}
                                            </p>
                                            {task.deadline && (
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Deadline: {task.deadline}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ================= CREATE MODAL ================= */}
                        {showCreate && (
                            <TaskModal
                                title="Create Task"
                                onClose={() => setShowCreate(false)}
                            >
                                <form
                                    onSubmit={submitCreate}
                                    className="space-y-3"
                                >
                                    <textarea
                                        placeholder="Task description"
                                        value={createForm.data.description}
                                        onChange={(e) =>
                                            createForm.setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded border px-2 py-1"
                                        required
                                    />

                                    <input
                                        type="date"
                                        value={createForm.data.deadline}
                                        onChange={(e) =>
                                            createForm.setData(
                                                "deadline",
                                                e.target.value,
                                            )
                                        }
                                        className="rounded border px-2 py-1"
                                    />

                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowCreate(false)}
                                            className="rounded border px-3 py-1"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={isCreating}
                                            className={`w-full rounded py-2 ${
                                                isCreating
                                                    ? "cursor-not-allowed bg-gray-400"
                                                    : "bg-black text-white"
                                            }`}
                                        >
                                            {isCreating
                                                ? "Saving..."
                                                : "Create Task"}
                                        </button>
                                    </div>
                                </form>
                            </TaskModal>
                        )}

                        {/* ================= EDIT MODAL ================= */}
                        {editingTask && (
                            <TaskModal
                                title="Edit Task"
                                onClose={() => setEditingTask(null)}
                            >
                                <form
                                    onSubmit={submitEdit}
                                    className="space-y-3"
                                >
                                    <textarea
                                        placeholder="Task description"
                                        value={editForm.data.description}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded border px-2 py-1"
                                        required
                                    />

                                    <input
                                        type="date"
                                        value={editForm.data.deadline}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "deadline",
                                                e.target.value,
                                            )
                                        }
                                        className="rounded border px-2 py-1"
                                    />

                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setEditingTask(null)}
                                            className="rounded border px-3 py-1"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="rounded bg-black px-4 py-1 text-white"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </TaskModal>
                        )}
                    </div>
                    <div className="w-[396px] bg-white"></div>
                </div>
            </div>
        </DndContext>
    );
}

import { router, useForm } from "@inertiajs/react";
import {
    DndContext,
    closestCenter,
    useDroppable,
    DragOverlay,
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    rectSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";

const colorMap = {
    orange: "bg-orange-300",
    lime: "bg-lime-300",
    sky: "bg-sky-300",
    violet: "bg-violet-300",
    fuchsia: "bg-fuchsia-300",
    pink: "bg-pink-300",
    zinc: "bg-zinc-300",
    purple: "bg-purple-300",
    emerald: "bg-emerald-300",
    green: "bg-green-300",
};

/* ===================== MODAL ===================== */
function Modal({ title, children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg w-full max-w-md p-4">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold text-lg">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black"
                    >
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

/* ===================== SORTABLE TASK ITEM ===================== */
function TaskItem({ task, onEdit, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const bgColor = colorMap[task.color] || "bg-gray-100";

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
    };

    // Format deadline as "12 Jan" or "1 Mar"
    const formatDeadline = (deadline) => {
        if (!deadline) return null;
        const date = new Date(deadline);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        return `${day} ${month}`;
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners} // 👈 whole card draggable
            className={`rounded-lg p-4 shadow cursor-grab select-none ${bgColor}`}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <p className="text-sm text-gray-800">{task.description}</p>
                    <p className="text-xs text-gray-700 mt-1 font-medium">
                        📅{" "}
                        {task.deadline
                            ? formatDeadline(task.deadline)
                            : "No deadline"}
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onPointerDown={(e) => e.stopPropagation()} // 🛑 block drag start
                        onClick={() => onEdit(task)}
                        className="text-blue-600 hover:underline"
                    >
                        Edit
                    </button>

                    <button
                        onPointerDown={(e) => e.stopPropagation()} // 🛑 block drag start
                        onClick={() => onDelete(task.id)}
                        className="text-red-600 hover:underline"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ===================== ARCHIVE ZONE ===================== */
function ArchiveZone() {
    const { setNodeRef, isOver } = useDroppable({ id: "archive" });

    return (
        <div
            ref={setNodeRef}
            className={`border-2 border-dashed p-6 rounded text-center ${
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
            <div className="max-w-xl mx-auto py-6 space-y-6">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">My Tasks</h1>
                    <button
                        onClick={() => setShowCreate(true)}
                        disabled={isCreating}
                        className={`px-4 py-1 rounded flex items-center gap-2
      ${isCreating ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"}
    `}
                    >
                        {isCreating ? (
                            <>
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
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
                            "+ New Task"
                        )}
                    </button>
                </div>

                {/* SORTABLE LIST */}
                <SortableContext
                    items={items.map((t) => t.id)}
                    strategy={rectSortingStrategy}
                >
                    <div className="grid grid-cols-3 gap-3">
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
                    <div className="border p-3 rounded bg-white shadow-lg">
                        {activeTask.description && (
                            <p className="text-sm text-gray-800">
                                {activeTask.description}
                            </p>
                        )}
                    </div>
                ) : null}
            </DragOverlay>

            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-3 text-gray-700">
                    Recently Archived
                </h2>

                {archivedTasks.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No archived tasks yet.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {archivedTasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-gray-100 rounded-lg p-3 text-sm opacity-80"
                            >
                                <p className="font-medium line-through text-gray-800">
                                    {task.description}
                                </p>
                                {task.deadline && (
                                    <p className="text-xs text-gray-500 mt-1">
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
                <Modal title="Create Task" onClose={() => setShowCreate(false)}>
                    <form onSubmit={submitCreate} className="space-y-3">
                        <textarea
                            placeholder="Task description"
                            value={createForm.data.description}
                            onChange={(e) =>
                                createForm.setData(
                                    "description",
                                    e.target.value
                                )
                            }
                            className="w-full border px-2 py-1 rounded"
                            required
                        />

                        <input
                            type="date"
                            value={createForm.data.deadline}
                            onChange={(e) =>
                                createForm.setData("deadline", e.target.value)
                            }
                            className="border px-2 py-1 rounded"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowCreate(false)}
                                className="px-3 py-1 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isCreating}
                                className={`w-full py-2 rounded ${
                                    isCreating
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-black text-white"
                                }`}
                            >
                                {isCreating ? "Saving..." : "Create Task"}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* ================= EDIT MODAL ================= */}
            {editingTask && (
                <Modal title="Edit Task" onClose={() => setEditingTask(null)}>
                    <form onSubmit={submitEdit} className="space-y-3">
                        <textarea
                            placeholder="Task description"
                            value={editForm.data.description}
                            onChange={(e) =>
                                editForm.setData("description", e.target.value)
                            }
                            className="w-full border px-2 py-1 rounded"
                            required
                        />

                        <input
                            type="date"
                            value={editForm.data.deadline}
                            onChange={(e) =>
                                editForm.setData("deadline", e.target.value)
                            }
                            className="border px-2 py-1 rounded"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setEditingTask(null)}
                                className="px-3 py-1 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="bg-black text-white px-4 py-1 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </DndContext>
    );
}

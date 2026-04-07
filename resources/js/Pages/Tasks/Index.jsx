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
            className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 px-6 py-16 ${
                isOver
                    ? "border-green-600 bg-green-100 text-black"
                    : "text-gray-600"
            }`}
        >
            <svg
                width="29"
                height="30"
                viewBox="0 0 29 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M25.375 13.32V23.75C25.375 24.413 25.1204 25.0489 24.6672 25.5178C24.214 25.9866 23.5993 26.25 22.9583 26.25H6.04167C5.40073 26.25 4.78604 25.9866 4.33283 25.5178C3.87961 25.0489 3.625 24.413 3.625 23.75V6.25C3.625 5.58696 3.87961 4.95107 4.33283 4.48223C4.78604 4.01339 5.40073 3.75 6.04167 3.75H20.9573M10.875 13.75L14.5 17.5L26.5833 5"
                    stroke="#00C950"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <p className="max-w-[190px] pt-3 text-center text-sm">
                Drag the task here to mark it as done
            </p>
        </div>
    );
}

/* ===================== PAGE ===================== */
export default function Index({
    tasks = [],
    categories = [],
    archivedTasks = [],
}) {
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
            deadline: task.deadline ? task.deadline.substring(0, 16) : "",
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
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.5238 3.8147e-06C13.0161 3.8147e-06 15.3029 0.848087 17.1071 2.26603L15.748 5.11532C14.406 3.81806 12.5608 3.02025 10.5272 3.02025C6.4157 3.02025 3.08471 6.28186 3.08471 10.3077C3.08471 13.509 5.19354 16.2276 8.12399 17.2064L6.97372 20.0121C2.91011 18.5841 0.00019455 14.7795 0.00019455 10.3077C0.00019455 4.61586 4.71083 0.003356 10.5238 0.003356V3.8147e-06Z"
                                    fill="black"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19.2434 4.52869C20.3834 6.17458 21.0509 8.16573 21.0509 10.3044C21.0509 15.9963 16.3403 20.6088 10.5273 20.6088C9.70569 20.6088 8.9046 20.5149 8.13776 20.3406L9.30515 17.4913C9.70226 17.555 10.1097 17.5885 10.5273 17.5885C14.6388 17.5885 17.9698 14.3269 17.9698 10.301C17.9698 9.61384 17.8706 8.94677 17.6891 8.31657L19.2434 4.52534V4.52869Z"
                                    fill="black"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.2757 16.5963L12.7249 20.3808C12.2764 20.4747 11.8142 20.5417 11.3452 20.5752C11.3521 20.5752 11.3555 20.5752 11.3624 20.5752L12.718 17.2667C13.2692 17.1025 13.7896 16.8745 14.2791 16.5963H14.2757Z"
                                    fill="black"
                                    fillOpacity="0.14902"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.26212 18.5874C3.9232 18.3394 3.59797 18.0746 3.28986 17.7896L4.5668 14.6755C4.83041 15.0208 5.12482 15.3392 5.4432 15.6342L4.23815 18.574L4.25869 18.5908L4.26212 18.5874Z"
                                    fill="black"
                                    fillOpacity="0.14902"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
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
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setShowCreate(true)}
                                        disabled={isCreating}
                                        className={`flex h-10 cursor-pointer items-center gap-2 rounded-full bg-gray-300 px-5 text-sm font-medium transition-all hover:bg-gray-400 ${
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
                                    <button
                                        onClick={() =>
                                            router.post(route("logout"))
                                        }
                                        className="flex h-10 cursor-pointer items-center gap-2 rounded-full bg-gray-100 px-5 text-sm font-medium text-gray-600 transition-all hover:bg-red-100 hover:text-red-600"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line
                                                x1="21"
                                                y1="12"
                                                x2="9"
                                                y2="12"
                                            />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            </div>

                            {/* SORTABLE LIST */}
                            <SortableContext
                                items={items.map((t) => t.id)}
                                strategy={rectSortingStrategy}
                            >
                                <div className="grid grid-cols-4 gap-6">
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
                        </div>

                        {/* DRAG PREVIEW */}
                        <DragOverlay>
                            {activeTask ? (
                                <div className="aspect-square cursor-grab rounded-[18px] border border-gray-300 bg-white/40 p-6 backdrop-blur-md select-none">
                                    {activeTask.description && (
                                        <p className="text-[15px] leading-snug text-gray-800">
                                            {activeTask.description}
                                        </p>
                                    )}
                                </div>
                            ) : null}
                        </DragOverlay>

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
                                        rows={10}
                                        className="text-heading rounded-base block w-full resize-none rounded-xl border border-gray-300 bg-white p-3.5 text-sm"
                                        required
                                    />

                                    <div className="flex items-center justify-end gap-2">
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowCreate(false)
                                                }
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
                                                {isCreating
                                                    ? "Saving..."
                                                    : "Create Task"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div className="absolute bottom-20 flex w-full flex-col-reverse gap-1.5 pr-[44px] pl-[11px]">
                                    <input
                                        type="datetime-local"
                                        value={createForm.data.deadline}
                                        onChange={(e) =>
                                            createForm.setData(
                                                "deadline",
                                                e.target.value,
                                            )
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
                                        rows={10}
                                        className="text-heading rounded-base block w-full resize-none rounded-xl border border-gray-300 bg-white p-3.5 text-sm"
                                        required
                                    />

                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            type="button"
                                            onPointerDown={(e) =>
                                                e.stopPropagation()
                                            }
                                            onClick={() => {
                                                deleteTask(editingTask.id);
                                                setEditingTask(null);
                                            }}
                                            className="flex h-10 cursor-pointer items-center gap-2 rounded-full bg-red-500 px-5 text-sm font-medium text-white transition-all hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setEditingTask(null)
                                                }
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
                                        value={editForm.data.deadline}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "deadline",
                                                e.target.value,
                                            )
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
                        )}
                    </div>
                    <div className="h-svh w-[396px] bg-white p-6">
                        {/* ARCHIVE DROP ZONE */}
                        <ArchiveZone />
                        <div>
                            <p className="pt-5 pb-4 font-medium">
                                Last 5 task done
                            </p>
                            <div>
                                {archivedTasks.length === 0 ? (
                                    <p className="text-sm text-gray-500">
                                        No archived tasks yet.
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {archivedTasks.map((task) => {
                                            const bgColor =
                                                colorMap[task.color] ||
                                                "bg-gray-100";
                                            return (
                                                <div
                                                    key={task.id}
                                                    className={`min-h-[65px] rounded-xl px-5 py-4 text-sm opacity-80 ${bgColor}`}
                                                >
                                                    <p className="line-clamp-2 text-[13px] leading-snug">
                                                        {task.description}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DndContext>
    );
}

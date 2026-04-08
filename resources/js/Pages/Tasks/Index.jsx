import { router } from "@inertiajs/react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    rectSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import TaskItem from "@/Components/TaskItem";
import TuduLogo from "@/Components/TuduLogo";
import TaskHeader from "@/Components/TaskHeader";
import CreateTaskModal from "@/Components/CreateTaskModal";
import EditTaskModal from "@/Components/EditTaskModal";
import DragPreview from "@/Components/DragPreview";
import Sidebar from "@/Components/Sidebar";

export default function Index({
    tasks = [],
    categories = [],
    archivedTasks = [],
}) {
    const generalCategory = categories.find((c) => c.name === "General");

    /* ===== LOCAL STATE ===== */
    const [items, setItems] = useState(tasks);
    const [activeTask, setActiveTask] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        setItems(tasks);
    }, [tasks]);

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
                        <TuduLogo />
                        <div className="mx-auto space-y-8 py-9">
                            {/* HEADER */}
                            <TaskHeader
                                onAddTask={() => setShowCreate(true)}
                                isCreating={false}
                            />

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
                                            onEdit={setEditingTask}
                                            onDelete={deleteTask}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </div>

                        {/* DRAG PREVIEW */}
                        <DragPreview activeTask={activeTask} />

                        {/* CREATE MODAL */}
                        {showCreate && (
                            <CreateTaskModal
                                onClose={() => setShowCreate(false)}
                                defaultCategoryId={
                                    generalCategory
                                        ? generalCategory.id
                                        : ""
                                }
                            />
                        )}

                        {/* EDIT MODAL */}
                        {editingTask && (
                            <EditTaskModal
                                task={editingTask}
                                onClose={() => setEditingTask(null)}
                                onDelete={deleteTask}
                            />
                        )}
                    </div>
                    <Sidebar archivedTasks={archivedTasks} />
                </div>
            </div>
        </DndContext>
    );
}

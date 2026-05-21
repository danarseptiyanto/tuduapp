import { Head, router, Link } from "@inertiajs/react";
import {
    SortableContext,
    rectSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import {
    DndContext,
    closestCenter,
    pointerWithin,
    useSensor,
    useSensors,
    PointerSensor,
    TouchSensor,
} from "@dnd-kit/core";
import { useState, useEffect, useCallback } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { usePWAInstall } from "@/Hooks/usePWAInstall";
import { useDarkMode } from "@/Hooks/useDarkMode";
import TaskItem from "@/Components/TaskItem";
import CategoryFilter from "@/Components/CategoryFilter";
import TuduLogo from "@/Components/TuduLogo";
import ThemeToggle from "@/Components/ThemeToggle";
import TaskHeader from "@/Components/TaskHeader";
import CreateTaskModal from "@/Components/CreateTaskModal";
import EditTaskModal from "@/Components/EditTaskModal";
import DragPreview from "@/Components/DragPreview";
import Sidebar from "@/Components/Sidebar";
import LoginLayout from "@/Layouts/LoginLayout";
import ArchiveZone from "@/Components/ArchiveZone";

export default function Index({
    tasks = [],
    categories = [],
    archivedTasks = [],
    user = {},
    filters = {},
}) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Small movement threshold to distinguish click vs drag
            },
        }),
    );

    // Custom collision detection: archive zone takes priority when the pointer
    // is physically over it, otherwise fall back to closestCenter for sorting.
    const collisionDetection = useCallback((args) => {
        const archiveCollisions = pointerWithin({
            ...args,
            droppableContainers: args.droppableContainers.filter(
                (c) => c.id === "archive",
            ),
        });
        if (archiveCollisions.length > 0) return archiveCollisions;
        return closestCenter(args);
    }, []);

    /* ===== LOCAL STATE ===== */
    const [items, setItems] = useState(tasks);
    const [activeTask, setActiveTask] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(
        filters.category || "",
    );
    const { canInstall, isInstalled, install } = usePWAInstall();
    const { isDark, toggle } = useDarkMode();

    useEffect(() => {
        setItems(tasks);
    }, [tasks]);

    /* ===== DELETE ===== */
    function deleteTask(id) {
        setItems((prev) => prev.filter((t) => t.id !== id)); // optimistic
        router.delete(`/tasks/${id}`);
    }

    /* ===== UNARCHIVE ===== */
    function unarchiveTask(id) {
        router.post(`/tasks/${id}/unarchive`);
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
        <LoginLayout>
            <DndContext
                collisionDetection={collisionDetection}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <Head title="Tasks - Tudus" />
                <div className="bg-[#F8F6F5] transition-colors dark:bg-gray-900">
                    <div className="mx-auto flex max-w-[1540px] justify-between">
                        <div className="mx-6 min-h-dvh w-[1025px] pt-7 md:mx-14">
                            <div className="flex items-center justify-between md:block">
                                <TuduLogo />
                                <div className="block md:hidden">
                                    <CategoryFilter
                                        categories={categories}
                                        initialValue={filters.category}
                                        onCategoryChange={(val) =>
                                            setSelectedCategory(val)
                                        }
                                    />
                                </div>
                                <Menu>
                                    <MenuButton className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-xl bg-[#F9C974] md:hidden">
                                        <svg
                                            className="h-4.5 w-4.5 fill-gray-800"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M16 18V20H5V18H16ZM21 11V13H3V11H21ZM19 4V6H8V4H19Z" />
                                        </svg>
                                    </MenuButton>
                                    <MenuItems
                                        anchor="bottom end"
                                        className="z-40 mt-2 w-44 min-w-36 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg outline-none"
                                    >
                                        {canInstall && !isInstalled && (
                                            <MenuItem>
                                                <button
                                                    className="inline-flex w-full items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-[#F9C974]/20 hover:text-gray-900"
                                                    onClick={install}
                                                >
                                                    Install App
                                                </button>
                                            </MenuItem>
                                        )}
                                        <MenuItem>
                                            <button
                                                className="inline-flex w-full items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-[#F9C974]/20 hover:text-gray-900"
                                                onClick={toggle}
                                            >
                                                {isDark
                                                    ? "Light Mode"
                                                    : "Dark Mode"}
                                            </button>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link
                                                className="inline-flex w-full items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-[#F9C974]/20 hover:text-gray-900"
                                                href="/profile"
                                            >
                                                Profile
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link
                                                className="inline-flex w-full items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-[#F9C974]/20 hover:text-gray-900"
                                                href="/profile"
                                            >
                                                Change Password
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <button
                                                className="inline-flex w-full items-center rounded-lg p-2 text-sm text-red-600 hover:bg-[#F9C974]/20 hover:text-red-700"
                                                onClick={() =>
                                                    router.post(route("logout"))
                                                }
                                            >
                                                Log Out
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                            <div className="mx-auto space-y-8 py-6 md:py-9">
                                {/* HEADER */}
                                <TaskHeader
                                    onAddTask={() => setShowCreate(true)}
                                    isCreating={false}
                                    userName={user.name}
                                >
                                    <CategoryFilter
                                        categories={categories}
                                        initialValue={filters.category}
                                        onCategoryChange={(val) =>
                                            setSelectedCategory(val)
                                        }
                                    />
                                </TaskHeader>
                                <div className="fixed right-8 bottom-24 z-30 flex flex-col items-end justify-between gap-2 md:hidden">
                                    <button
                                        onClick={() => setShowCreate(true)}
                                        className="flex h-14 cursor-pointer items-center gap-2 rounded-full bg-[#F9C974] px-7 text-sm font-medium shadow-sm transition-all hover:bg-amber-400"
                                    >
                                        Add Task
                                    </button>
                                </div>
                                {/* SORTABLE LIST */}
                                <SortableContext
                                    items={items.map((t) => t.id)}
                                    strategy={rectSortingStrategy}
                                >
                                    {items.length === 0 && (
                                        <div className="flex h-[calc(100dvh-13rem)] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#F9C974]/50 py-24 md:h-max">
                                            <p className="text-5xl text-gray-500 md:text-9xl">
                                                \(-_-)/
                                            </p>
                                            <p className="mt-9 text-sm text-gray-500">
                                                {selectedCategory
                                                    ? "No tasks in this category."
                                                    : "You have no task."}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    setShowCreate(true)
                                                }
                                                className="mt-4 flex h-10 cursor-pointer items-center gap-2 rounded-full border border-gray-400 px-5 text-sm font-medium whitespace-nowrap text-gray-700 transition-all hover:bg-gray-300"
                                            >
                                                Add a new Task
                                            </button>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-6">
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
                                    defaultCategoryId={null}
                                    categories={categories}
                                />
                            )}

                            {/* EDIT MODAL */}
                            {editingTask && (
                                <EditTaskModal
                                    task={editingTask}
                                    onClose={() => setEditingTask(null)}
                                    onDelete={deleteTask}
                                    categories={categories}
                                />
                            )}
                        </div>
                        <Sidebar
                            archivedTasks={archivedTasks}
                            onUnarchive={unarchiveTask}
                        >
                            <div className="fixed bottom-0 left-0 z-20 block w-full rounded-t-3xl bg-white p-2 md:static md:p-0">
                                <ArchiveZone />
                            </div>
                        </Sidebar>
                    </div>
                </div>
            </DndContext>
        </LoginLayout>
    );
}

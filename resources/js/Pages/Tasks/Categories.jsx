import { Head, useForm, Link } from "@inertiajs/react";
import { useState } from "react";
import LoginLayout from "@/Layouts/LoginLayout";
import TuduLogo from "@/Components/TuduLogo";
import ThemeToggle from "@/Components/ThemeToggle";

export default function Categories({ categories }) {
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");

    const createForm = useForm({
        name: "",
    });

    const editForm = useForm({
        name: "",
    });

    function handleCreate(e) {
        e.preventDefault();
        createForm.post("/tasks/categories", {
            onSuccess: () => {
                createForm.reset();
            },
        });
    }

    function startEdit(category) {
        setEditingId(category.id);
        setEditName(category.name);
        editForm.setData("name", category.name);
    }

    function handleUpdate(e, id) {
        e.preventDefault();
        editForm.patch(`/tasks/categories/${id}`, {
            onSuccess: () => {
                setEditingId(null);
            },
        });
    }

    function handleDelete(id) {
        if (confirm("Delete this category? Tasks will be uncategorized.")) {
            editForm.delete(`/tasks/categories/${id}`);
        }
    }

    return (
        <LoginLayout>
            <Head title="Categories - Tudus" />
            <div className="bg-[#F8F6F5] transition-colors dark:bg-gray-900">
                <div className="mx-auto flex max-w-[1540px] justify-between">
                    <div className="mx-6 min-h-dvh w-full pt-7 md:mx-14">
                        <div className="flex items-center justify-between md:block">
                            <div className="flex items-center gap-4">
                                <TuduLogo />
                                <Link
                                    href="/tasks"
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                >
                                    ← Back to Tasks
                                </Link>
                            </div>
                            <ThemeToggle className="md:hidden" />
                        </div>

                        <div className="mx-auto max-w-3xl space-y-8 py-6 md:py-9">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Manage Categories
                            </h1>

                            {/* Create Form */}
                            <form
                                onSubmit={handleCreate}
                                className="flex gap-3"
                            >
                                <input
                                    type="text"
                                    value={createForm.data.name}
                                    onChange={(e) =>
                                        createForm.setData("name", e.target.value)
                                    }
                                    placeholder="New category name"
                                    className="text-heading flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="rounded-full bg-[#F9C974] px-5 py-2 text-sm font-medium text-black transition-all hover:bg-amber-400 disabled:opacity-50"
                                >
                                    {createForm.processing
                                        ? "Creating..."
                                        : "Create"}
                                </button>
                            </form>

                            {/* Categories List */}
                            <div className="space-y-3">
                                {categories.length === 0 && (
                                    <p className="text-center text-gray-500">
                                        No categories yet. Create one above.
                                    </p>
                                )}

                                {categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
                                    >
                                        {editingId === cat.id ? (
                                            <form
                                                onSubmit={(e) =>
                                                    handleUpdate(e, cat.id)
                                                }
                                                className="flex flex-1 gap-3"
                                            >
                                                <input
                                                    type="text"
                                                    value={editForm.data.name}
                                                    onChange={(e) =>
                                                        editForm.setData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="text-heading flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
                                                    required
                                                    autoFocus
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={editForm.processing}
                                                    className="rounded-full bg-[#F9C974] px-4 py-2 text-sm font-medium text-black transition-all hover:bg-amber-400 disabled:opacity-50"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setEditingId(null)
                                                    }
                                                    className="rounded-full bg-gray-300 px-4 py-2 text-sm font-medium transition-all hover:bg-gray-400"
                                                >
                                                    Cancel
                                                </button>
                                            </form>
                                        ) : (
                                            <>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {cat.name}
                                                </span>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            startEdit(cat)
                                                        }
                                                        className="rounded-full bg-gray-200 px-4 py-2 text-sm font-medium transition-all hover:bg-gray-300"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(cat.id)
                                                        }
                                                        className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoginLayout>
    );
}

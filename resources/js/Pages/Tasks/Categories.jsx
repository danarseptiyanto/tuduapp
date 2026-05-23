import { Head, useForm, Link, router } from "@inertiajs/react";
import { useState } from "react";
import LoginLayout from "@/Layouts/LoginLayout";
import TuduLogo from "@/Components/TuduLogo";
import PrimaryButton from "@/Components/PrimaryButton";

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
        createForm.post(route("categories.store"), {
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
        editForm.patch(route("categories.update", id), {
            onSuccess: () => {
                setEditingId(null);
            },
        });
    }

    function handleDelete(id) {
        if (confirm("Delete this category? Tasks will be uncategorized.")) {
            editForm.delete(route("categories.destroy", id));
        }
    }

    return (
        <LoginLayout>
            <Head title="Categories - Tudus" />
            <div className="bg-[#F8F6F5] transition-colors dark:bg-[#1F1F1F]">
                <div className="mx-auto flex max-w-[1540px] justify-between">
                    <div className="mx-auto min-h-dvh w-full max-w-[1540px] justify-between">
                        <div className="mx-6 flex items-center justify-between pt-7 md:mx-14">
                            <Link href={route("tasks.index")}>
                                <TuduLogo />
                            </Link>
                            <PrimaryButton
                                onClick={() => router.get(route("tasks.index"))}
                            >
                                Back to Tasks
                            </PrimaryButton>
                        </div>

                        <div className="mx-6 max-w-3xl space-y-8 py-8 md:mx-auto md:py-12">
                            <div className="items-center justify-between md:flex">
                                <h1 className="pb-4 text-xl text-gray-900 md:pb-0 md:text-2xl dark:text-white">
                                    Manage{" "}
                                    <span className="font-semibold">
                                        Categories
                                    </span>
                                </h1>
                                <form
                                    onSubmit={handleCreate}
                                    className="flex gap-2 md:flex-row"
                                >
                                    <input
                                        type="text"
                                        value={createForm.data.name}
                                        onChange={(e) =>
                                            createForm.setData(
                                                "name",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Add new category"
                                        className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm dark:border-white/15 dark:bg-[#1F1F1F] dark:text-[#D1CFC0] dark:placeholder-[#d1cfc0]"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={createForm.processing}
                                        className="w-min rounded-full bg-[#F9C974] px-4 py-2 text-sm font-medium text-black transition-all hover:bg-amber-400 disabled:opacity-50"
                                    >
                                        {createForm.processing
                                            ? "Adding..."
                                            : "Add"}
                                    </button>
                                </form>
                            </div>
                            {/* Categories List */}
                            <div className="space-y-3">
                                {categories.length === 0 && (
                                    <div className="rounded-lg border-2 border-dashed border-[#F9C974]/50 p-4 py-10">
                                        <p className="text-center text-sm text-gray-500 dark:text-[#d1cfc0]">
                                            No categories yet. Create one above.
                                        </p>
                                    </div>
                                )}

                                <div className="grid gap-2 md:grid-cols-2">
                                    {categories.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-white/15 dark:bg-[#292929]"
                                        >
                                            {editingId === cat.id ? (
                                                <form
                                                    onSubmit={(e) =>
                                                        handleUpdate(e, cat.id)
                                                    }
                                                    className="flex flex-1 gap-2"
                                                >
                                                    <input
                                                        type="text"
                                                        value={
                                                            editForm.data.name
                                                        }
                                                        onChange={(e) =>
                                                            editForm.setData(
                                                                "name",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="text-heading w-full flex-1 rounded-lg border border-gray-300 bg-white px-2.5 py-0.5 text-sm dark:border-white/15 dark:bg-[#1F1F1F] dark:text-[#D1CFC0]"
                                                        required
                                                        autoFocus
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={
                                                            editForm.processing
                                                        }
                                                        className="flex aspect-square h-[30px] cursor-pointer items-center justify-center rounded-full bg-green-300 p-2 text-sm font-medium transition-all hover:bg-green-400 md:h-7"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"></path>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setEditingId(null)
                                                        }
                                                        className="flex aspect-square h-[30px] cursor-pointer items-center justify-center rounded-full bg-gray-200 p-2 text-sm font-medium transition-all hover:bg-gray-300 md:h-7 dark:bg-gray-600 dark:hover:bg-gray-500"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                                                        </svg>
                                                    </button>
                                                </form>
                                            ) : (
                                                <>
                                                    <span className="text-sm font-medium text-gray-900 dark:text-[#D1CFC0]">
                                                        {cat.name}
                                                    </span>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() =>
                                                                startEdit(cat)
                                                            }
                                                            className="flex aspect-square h-[30px] cursor-pointer items-center justify-center rounded-full bg-gray-200 p-2 text-sm font-medium transition-all hover:bg-gray-300 md:h-7 dark:bg-gray-600 dark:hover:bg-gray-500"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                            >
                                                                <path d="M16.7574 2.99678L14.7574 4.99678H5V18.9968H19V9.23943L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99678C3 3.4445 3.44772 2.99678 4 2.99678H16.7574ZM20.4853 2.09729L21.8995 3.5115L12.7071 12.7039L11.2954 12.7064L11.2929 11.2897L20.4853 2.09729Z"></path>
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    cat.id,
                                                                )
                                                            }
                                                            className="aspect-square h-[30px] cursor-pointer rounded-full bg-red-500 p-2 text-sm font-medium text-white transition-all hover:bg-red-600 md:h-7"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                            >
                                                                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
                                                            </svg>
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
            </div>
        </LoginLayout>
    );
}

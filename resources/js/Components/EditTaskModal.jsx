import { useForm, router } from "@inertiajs/react";
import { useState } from "react";
import TaskModal from "./TaskModal";
import CategorySelect from "./CategorySelect";
import ChecklistEditor from "./ChecklistEditor";

export default function EditTaskModal({
	task,
	onClose,
	onDelete,
	categories = [],
}) {
	const initialIsChecklist = task.type === "checklist";
	const [mode, setMode] = useState(initialIsChecklist ? "checklist" : "note");
	const [items, setItems] = useState(() =>
		initialIsChecklist && task.checklistItems?.length > 0
			? task.checklistItems.map((i) => ({
					id: i.id,
					label: i.label,
					is_done: !!i.is_done,
				}))
			: [{ label: "", is_done: false }],
	);
	const [itemsError, setItemsError] = useState("");

	const form = useForm({
		description: task.description || "",
		deadline: task.deadline ? task.deadline.substring(0, 16) : "",
		category_id: task.category_id || null,
	});

	function handleModeSwitch(next) {
		setMode(next);
		setItemsError("");
		if (next === "checklist" && items.length === 0) {
			setItems([{ label: "", is_done: false }]);
		}
	}

	function handleSubmit(e) {
		e.preventDefault();

		let payloadItems = null;
		if (mode === "checklist") {
			const filled = items.filter((i) => (i.label || "").trim() !== "");
			if (filled.length === 0) {
				setItemsError("Add at least one item to your checklist.");
				return;
			}
			payloadItems = filled.map((i, index) => ({
				...(i.id ? { id: i.id } : {}),
				label: i.label.trim(),
				is_done: !!i.is_done,
				order: index,
			}));
		} else {
			// Switching checklist -> note: clear items on server
			payloadItems = initialIsChecklist ? [] : null;
		}

		const payload = {
			description: form.data.description,
			type: mode,
			deadline: form.data.deadline || null,
			category_id: form.data.category_id,
			...(payloadItems !== null ? { items: payloadItems } : {}),
		};

		router.patch(`/tasks/${task.id}`, payload, {
			preserveScroll: true,
			onSuccess: () => onClose(),
		});
	}

	return (
		<TaskModal title="Edit Task" onClose={onClose}>
			<div className="mb-3 flex w-fit rounded-full bg-gray-100 p-1 dark:bg-white/10">
				{["note", "checklist"].map((m) => (
					<button
						key={m}
						type="button"
						onClick={() => handleModeSwitch(m)}
						className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
							mode === m
								? "bg-[#F9C974] text-black shadow-sm"
								: "text-gray-500 hover:text-gray-800 dark:text-[#d1cfc0]/70 dark:hover:text-white"
						}`}
					>
						{m === "note" ? "Note" : "Checklist"}
					</button>
				))}
			</div>

			<form onSubmit={handleSubmit} className="space-y-3">
				{mode === "note" ? (
					<textarea
						placeholder="Task description"
						value={form.data.description}
						onChange={(e) =>
							form.setData("description", e.target.value)
						}
						rows={10}
						className="text-heading rounded-base block w-full resize-none rounded-xl border border-gray-300 bg-white p-3.5 text-sm dark:border-white/15 dark:bg-[#1F1F1F] dark:text-[#D1CFC0] dark:placeholder-[#d1cfc0]"
					/>
				) : (
					<div className="space-y-3">
						<input
							type="text"
							placeholder="Checklist title (optional)"
							value={form.data.description}
							onChange={(e) =>
								form.setData("description", e.target.value)
							}
							className="text-heading block w-full rounded-xl border border-gray-300 bg-white p-3.5 text-sm font-medium dark:border-white/15 dark:bg-[#1F1F1F] dark:text-[#D1CFC0] dark:placeholder-[#d1cfc0]"
						/>
						<div className="max-h-[38dvh] overflow-y-auto rounded-xl border border-gray-300 bg-white p-3 dark:border-white/15 dark:bg-[#1F1F1F]">
							<ChecklistEditor
								items={items}
								onChange={(next) => {
									setItems(next);
									if (
										next.some(
											(i) =>
												(i.label || "").trim() !== "",
										)
									)
										setItemsError("");
								}}
							/>
							{itemsError && (
								<p className="mt-2 text-xs text-red-500">
									{itemsError}
								</p>
							)}
						</div>
					</div>
				)}

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
							className="flex h-10 cursor-pointer items-center gap-2 rounded-full bg-gray-300 px-5 text-sm font-medium transition-all hover:bg-gray-400 dark:hover:bg-[#F9C974]"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="flex h-10 cursor-pointer items-center gap-2 rounded-full bg-[#F9C974] px-5 text-sm font-medium whitespace-nowrap text-black transition-all hover:bg-gray-400 dark:hover:bg-amber-400"
						>
							Save
						</button>
					</div>
				</div>
			</form>
			<div className="absolute bottom-20 grid w-full grid-cols-2 gap-2 pr-[44px] pl-[11px]">
				<CategorySelect
					categories={categories}
					value={form.data.category_id}
					onChange={(val) => form.setData("category_id", val)}
				/>
				<div>
					<label
						htmlFor="deadline"
						className="text-xs leading-none text-gray-500 dark:text-[#d1cfc0]"
					>
						Deadline
					</label>
					<input
						type="datetime-local"
						value={form.data.deadline}
						onChange={(e) =>
							form.setData("deadline", e.target.value)
						}
						className="datetime-input text-heading block h-8 w-full rounded-lg border border-gray-300 bg-white pr-0 pb-2 pl-2 text-xs scheme-light md:pr-2 md:text-sm dark:border-white/15 dark:bg-[#292929] dark:text-[#D1CFC0] dark:placeholder-[#d1cfc0] dark:scheme-dark"
					/>
				</div>
			</div>
		</TaskModal>
	);
}

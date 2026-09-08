import { useForm, router } from "@inertiajs/react";
import { useState } from "react";
import TaskModal from "./TaskModal";
import CategorySelect from "./CategorySelect";
import ChecklistEditor from "./ChecklistEditor";

export default function CreateTaskModal({
	onClose,
	defaultCategoryId,
	categories = [],
}) {
	const [isCreating, setIsCreating] = useState(false);
	const [mode, setMode] = useState("note");
	const [items, setItems] = useState([{ label: "", is_done: false }]);
	const [itemsError, setItemsError] = useState("");

	const form = useForm({
		description: "",
		deadline: "",
		category_id: defaultCategoryId || null,
	});

	function handleSubmit(e) {
		e.preventDefault();

		if (mode === "checklist") {
			const filled = items.filter((i) => i.label.trim() !== "");
			if (filled.length === 0) {
				setItemsError("Add at least one item to your checklist.");
				return;
			}
			setItemsError("");
		}

		setIsCreating(true);

		router.post(
			"/tasks",
			{
				description: form.data.description,
				deadline: form.data.deadline || null,
				category_id: form.data.category_id,
				type: mode,
				items:
					mode === "checklist"
						? items
								.filter((i) => i.label.trim() !== "")
								.map((i) => ({
									label: i.label.trim(),
									is_done: !!i.is_done,
								}))
						: [],
			},
			{
				preserveScroll: true,
				onSuccess: () => {
					form.reset("description", "deadline");
					setItems([{ label: "", is_done: false }]);
					onClose();
					router.reload({ only: ["tasks"] });
				},
				onFinish: () => {
					setIsCreating(false);
				},
			},
		);
	}

	return (
		<TaskModal title="Create Task" onClose={onClose}>
			{/* Note / Checklist toggle */}
			<div className="mb-3 flex w-fit rounded-full bg-gray-100 p-1 dark:bg-white/10">
				{["note", "checklist"].map((m) => (
					<button
						key={m}
						type="button"
						onClick={() => setMode(m)}
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
				<div className="relative">
					{mode === "note" ? (
						<textarea
							placeholder="Task description"
							value={form.data.description}
							onChange={(e) =>
								form.setData("description", e.target.value)
							}
							rows={10}
							className="text-heading rounded-base block w-full resize-none rounded-xl border border-gray-300 bg-white p-3.5 pr-12 text-sm dark:border-white/15 dark:bg-[#1F1F1F] dark:text-[#D1CFC0] dark:placeholder-[#d1cfc0]"
							required
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
												(i) => i.label.trim() !== "",
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
				</div>

				<div className="flex items-center justify-start gap-2">
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
							disabled={isCreating}
							className={`flex h-10 cursor-pointer items-center gap-2 rounded-full bg-[#F9C974] px-5 text-sm font-medium whitespace-nowrap transition-all hover:bg-gray-400 dark:hover:bg-amber-400 ${
								isCreating
									? "cursor-not-allowed bg-gray-400"
									: " text-black"
							}`}
						>
							{isCreating
								? "Saving..."
								: mode === "checklist"
									? "Create Checklist"
									: "Create Task"}
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
						className="text-heading block h-8 w-full rounded-lg border border-gray-300 bg-white pr-0 pb-2 pl-2 text-xs scheme-light md:pr-2 md:text-sm dark:border-white/15 dark:bg-[#292929] dark:text-[#D1CFC0] dark:placeholder-[#d1cfc0] dark:scheme-dark"
					/>
				</div>
			</div>
		</TaskModal>
	);
}

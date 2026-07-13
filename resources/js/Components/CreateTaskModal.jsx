import { useForm, router } from "@inertiajs/react";
import { useState, useCallback } from "react";
import TaskModal from "./TaskModal";
import CategorySelect from "./CategorySelect";
import useSpeechRecognition from "../Hooks/useSpeechRecognition";

export default function CreateTaskModal({
	onClose,
	defaultCategoryId,
	categories = [],
}) {
	const [isCreating, setIsCreating] = useState(false);

	const form = useForm({
		description: "",
		deadline: "",
		category_id: defaultCategoryId || null,
	});

	const handleSpeechResult = useCallback(
		(transcript) => {
			const prev = form.data.description;
			form.setData(
				"description",
				prev ? prev + " " + transcript : transcript,
			);
		},
		[form],
	);

	const { isListening, start, stop, isSupported } = useSpeechRecognition({
		onResult: handleSpeechResult,
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
				<div className="relative">
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
					{isSupported && (
						<button
							type="button"
							onClick={isListening ? stop : start}
							className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
								isListening
									? "animate-pulse bg-red-500 text-white"
									: "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-white/10 dark:text-[#D1CFC0] dark:hover:bg-white/20"
							}`}
							title={
								isListening
									? "Stop listening"
									: "Start voice input"
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="h-4 w-4"
							>
								<path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
								<path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
							</svg>
						</button>
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
							{isCreating ? "Saving..." : "Create Task"}
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

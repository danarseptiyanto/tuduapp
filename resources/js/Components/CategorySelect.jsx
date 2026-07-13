import { useState } from "react";
import { router } from "@inertiajs/react";
import { Combobox } from "@headlessui/react";

export default function CategorySelect({ categories, value, onChange }) {
	const [query, setQuery] = useState("");
	const [creating, setCreating] = useState(false);
	const [newName, setNewName] = useState("");
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const filtered =
		query === ""
			? categories
			: categories.filter((cat) =>
					cat.name.toLowerCase().includes(query.toLowerCase()),
				);

	function handleCreate(e) {
		e.preventDefault();
		if (!newName.trim()) return;

		setError("");
		setSubmitting(true);

		router.post(
			"/tasks/categories",
			{ name: newName },
			{
				onSuccess: () => {
					setNewName("");
					setCreating(false);
					setQuery("");
					setSubmitting(false);
					router.reload({ only: ["categories"] });
				},
				onError: (errors) => {
					setSubmitting(false);
					if (errors.name) setError(errors.name);
				},
			},
		);
	}

	const selected = categories.find((c) => c.id === value) || null;

	return (
		<div className="relative w-full">
			<label className="text-xs leading-none text-gray-500 dark:text-[#d1cfc0]">
				Category
			</label>
			<Combobox value={value} onChange={onChange} nullable>
				<div className="relative">
					<Combobox.Input
						displayValue={(val) => {
							const cat = categories.find((c) => c.id === val);
							return cat ? cat.name : "";
						}}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Select or create"
						className="text-heading block h-8 w-full rounded-lg border border-gray-300 bg-white px-3 pb-2 text-xs md:text-sm dark:border-white/15 dark:bg-[#292929] dark:text-[#D1CFC0] dark:placeholder-[#d1cfc0]"
					/>
					<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-lg px-2">
						<svg
							className="h-4 w-4 text-gray-400 dark:text-[#D1CFC0]/50"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</Combobox.Button>

					<Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white py-1 text-xs shadow-lg md:text-sm dark:border-white/15 dark:bg-[#292929] dark:text-[#d1cfc0] dark:shadow-black/30">
						<Combobox.Option
							value={null}
							className={({ active }) =>
								`cursor-pointer px-3 py-2 dark:text-[#D1CFC0] ${
									active ? "bg-[#F9C974]/50 " : ""
								}`
							}
						>
							No category
						</Combobox.Option>

						{filtered.map((cat) => (
							<Combobox.Option
								key={cat.id}
								value={cat.id}
								className={({ active }) =>
									`cursor-pointer px-3 py-2 dark:text-[#D1CFC0] ${
										active ? "bg-black/20 " : ""
									}`
								}
							>
								{cat.name}
							</Combobox.Option>
						))}

						{filtered.length === 0 && query !== "" && (
							<div className="px-3 py-2 text-gray-500">
								No categories found
							</div>
						)}

						<div className="border-t border-gray-200 px-3 py-2 dark:border-white/15">
							<button
								type="button"
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => setCreating(true)}
								className="text-xs font-medium text-[#F9C974] hover:text-amber-600 md:text-sm"
							>
								Create category
							</button>
						</div>
					</Combobox.Options>
				</div>
			</Combobox>

			{creating && (
				<div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 shadow-lg dark:border-white/15 dark:bg-[#292929] dark:shadow-black/30">
					<form onSubmit={handleCreate} className="space-y-2">
						<input
							type="text"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							placeholder="Category name"
							className="text-heading block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs md:text-sm dark:border-white/15 dark:bg-[#1F1F1F] dark:text-[#D1CFC0]"
							autoFocus
						/>
						{error && (
							<p className="text-xs text-red-500">{error}</p>
						)}
						<div className="flex justify-between gap-2">
							<button
								type="button"
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => {
									setCreating(false);
									setNewName("");
									setError("");
								}}
								className="rounded-full bg-gray-300 px-1.5 transition-all hover:bg-gray-400 dark:hover:bg-[#F9C974]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="h-4 w-4 fill-gray-800"
								>
									<path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
								</svg>
							</button>
							<button
								type="submit"
								disabled={submitting || !newName.trim()}
								className="rounded-full bg-[#F9C974] px-3 py-1.5 text-xs font-medium text-black transition-all hover:bg-amber-400 disabled:opacity-50 md:text-sm"
							>
								{submitting ? "Creating..." : " "}
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}

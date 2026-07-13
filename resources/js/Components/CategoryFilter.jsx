import { router } from "@inertiajs/react";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function CategoryFilter({
	categories,
	initialValue,
	onCategoryChange,
}) {
	const [selected, setSelected] = useState(
		initialValue ? categories.find((c) => c.name === initialValue) : null,
	);

	function handleChange(cat) {
		setSelected(cat);
		const val = cat ? cat.name : "";
		onCategoryChange?.(val);
		if (val) {
			router.get("/tasks", { category: val }, { preserveState: true });
		} else {
			router.get("/tasks", {}, { preserveState: true });
		}
	}

	return (
		<Menu>
			<MenuButton className="flex h-10 cursor-pointer items-center gap-1 rounded-full border border-gray-400 bg-none ps-4.5 pe-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-300 dark:border-[#D1CFC0]/10 dark:text-[#D1CFC0] hover:dark:bg-[#D1CFC0]/20">
				<span className="block truncate">
					{selected ? selected.name : "All Categories"}
				</span>
				<svg
					className="pointer-events-none h-4 w-4 text-gray-400 dark:text-[#D1CFC0]/50"
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
			</MenuButton>

			<MenuItems
				anchor="bottom"
				className="z-50 mt-2 w-44 overflow-auto rounded-2xl border border-gray-200 bg-white p-2 text-sm shadow-lg outline-none [--anchor-gap:var(--spacing-1)] dark:border-white/15 dark:bg-[#292929] dark:shadow-black/30"
			>
				<MenuItem>
					<button
						onClick={() => handleChange(null)}
						className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-gray-700 data-focus:bg-[#F9C974]/20 data-focus:text-gray-900 dark:text-[#D1CFC0] dark:data-focus:text-white"
					>
						All Categories
					</button>
				</MenuItem>
				{categories.map((cat) => (
					<MenuItem key={cat.id}>
						<button
							onClick={() => handleChange(cat)}
							className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-nowrap text-gray-700 data-focus:bg-[#F9C974]/20 data-focus:text-gray-900 dark:text-[#D1CFC0] dark:data-focus:text-white"
						>
							{cat.name}
						</button>
					</MenuItem>
				))}
			</MenuItems>
		</Menu>
	);
}

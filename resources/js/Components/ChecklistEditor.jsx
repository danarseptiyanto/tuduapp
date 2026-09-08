import { useRef } from "react";

export default function ChecklistEditor({ items = [], onChange }) {
	const inputRefs = useRef([]);

	function updateItems(next) {
		onChange(next);
	}

	function updateLabel(index, label) {
		const next = items.map((item, i) =>
			i === index ? { ...item, label } : item,
		);
		updateItems(next);
	}

	function toggleDone(index) {
		const next = items.map((item, i) =>
			i === index ? { ...item, is_done: !item.is_done } : item,
		);
		updateItems(next);
	}

	function removeItem(index) {
		if (items.length <= 1) {
			updateItems([{ label: "", is_done: false }]);
			return;
		}
		updateItems(items.filter((_, i) => i !== index));
	}

	function addItem(focus = true, index = null) {
		const next = [...items];
		const insertAt = index === null ? next.length : index + 1;
		next.splice(insertAt, 0, { label: "", is_done: false });
		updateItems(next);
		if (focus) {
			setTimeout(() => inputRefs.current[insertAt]?.focus(), 0);
		}
	}

	function handleKeyDown(e, index) {
		if (e.key === "Enter") {
			e.preventDefault();
			addItem(true, index);
		} else if (
			e.key === "Backspace" &&
			items[index].label === "" &&
			items.length > 1
		) {
			e.preventDefault();
			const next = items.filter((_, i) => i !== index);
			updateItems(next);
			setTimeout(
				() => inputRefs.current[Math.max(0, index - 1)]?.focus(),
				0,
			);
		}
	}

	return (
		<div className="space-y-1.5 pb-16">
			{items.map((item, index) => (
				<div key={index} className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => toggleDone(index)}
						aria-label={
							item.is_done ? "Mark as not done" : "Mark as done"
						}
						className={`flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md border transition-colors ${
							item.is_done
								? "border-black bg-black text-white dark:border-[#F9C974] dark:bg-[#F9C974] dark:text-black"
								: "border-gray-300 bg-white hover:border-gray-500 dark:border-white/20 dark:bg-transparent"
						}`}
					>
						{item.is_done && (
							<svg
								className="h-3 w-3"
								viewBox="0 0 12 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M2.5 6.5L5 9L9.5 3.5"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						)}
					</button>
					<input
						ref={(el) => (inputRefs.current[index] = el)}
						type="text"
						value={item.label}
						onChange={(e) => updateLabel(index, e.target.value)}
						onKeyDown={(e) => handleKeyDown(e, index)}
						placeholder={
							index === 0 ? "List item" : "Add another item"
						}
						className={`block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-white/15 dark:bg-[#1F1F1F] dark:text-[#D1CFC0] dark:placeholder-[#d1cfc0]/60 ${
							item.is_done
								? "text-gray-400 line-through dark:text-[#d1cfc0]/50"
								: ""
						}`}
					/>
					<button
						type="button"
						onClick={() => removeItem(index)}
						aria-label="Remove item"
						className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-black/5 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-white"
					>
						<svg
							className="h-3.5 w-3.5"
							viewBox="0 0 24 24"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
						</svg>
					</button>
				</div>
			))}
			<button
				type="button"
				onClick={() => addItem(true)}
				className="mt-1 inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-black/5 hover:text-gray-800 dark:text-[#d1cfc0]/70 dark:hover:bg-white/10 dark:hover:text-white"
			>
				<span className="text-base leading-none">+</span> Add item
				<span className="hidden md:inline">(Enter ↵)</span>
			</button>
		</div>
	);
}

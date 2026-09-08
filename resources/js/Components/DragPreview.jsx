import { DragOverlay } from "@dnd-kit/core";

export default function DragPreview({ activeTask }) {
	const isChecklist =
		activeTask?.type === "checklist" &&
		Array.isArray(activeTask?.checklistItems);
	const done = isChecklist
		? activeTask.checklistItems.filter((i) => i.is_done).length
		: 0;
	const total = isChecklist ? activeTask.checklistItems.length : 0;

	return (
		<DragOverlay>
			{activeTask ? (
				<div className="aspect-square cursor-grab rounded-[18px] border border-gray-300 bg-white/40 p-6 backdrop-blur-md select-none">
					{isChecklist ? (
						<>
							{activeTask.description && (
								<p className="text-[15px] leading-snug font-medium whitespace-pre-wrap text-gray-800">
									{activeTask.description}
								</p>
							)}
							<p className="mt-1 text-xs text-gray-600">
								✓ {done}/{total}
							</p>
							<div className="mt-2 space-y-1">
								{activeTask.checklistItems
									.slice(0, 4)
									.map((item) => (
										<p
											key={item.id}
											className={`truncate text-[13px] text-gray-700 ${
												item.is_done
													? "line-through opacity-60"
													: ""
											}`}
										>
											{item.is_done ? "☑ " : "☐ "}
											{item.label}
										</p>
									))}
							</div>
						</>
					) : (
						activeTask.description && (
							<p className="text-[15px] leading-snug whitespace-pre-wrap text-gray-800">
								{activeTask.description}
							</p>
						)
					)}
				</div>
			) : null}
		</DragOverlay>
	);
}

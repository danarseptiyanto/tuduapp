import { DragOverlay } from "@dnd-kit/core";

export default function DragPreview({ activeTask }) {
    return (
        <DragOverlay>
            {activeTask ? (
                <div className="aspect-square cursor-grab rounded-[18px] border border-gray-300 bg-white/40 p-6 backdrop-blur-md select-none">
                    {activeTask.description && (
                        <p className="text-[15px] leading-snug text-gray-800">
                            {activeTask.description}
                        </p>
                    )}
                </div>
            ) : null}
        </DragOverlay>
    );
}

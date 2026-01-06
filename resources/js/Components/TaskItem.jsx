import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const colorMap = {
    orange: "bg-orange-300",
    lime: "bg-lime-300",
    sky: "bg-sky-300",
    violet: "bg-violet-300",
    fuchsia: "bg-fuchsia-300",
    pink: "bg-pink-300",
    zinc: "bg-zinc-300",
    purple: "bg-purple-300",
    emerald: "bg-emerald-300",
    green: "bg-green-300",
};

export default function TaskItem({ task, onEdit, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const bgColor = colorMap[task.color] || "bg-gray-100";

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
    };

    // Format deadline as "12 Jan" or "1 Mar"
    const formatDeadline = (deadline) => {
        if (!deadline) return null;
        const date = new Date(deadline);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        return `${day} ${month}`;
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`aspect-square cursor-grab rounded-[18px] p-6 select-none ${bgColor}`}
        >
            <div className="flex h-full flex-col justify-between">
                <div className="flex-1">
                    <p className="text-[15px] leading-snug">
                        {task.description}
                    </p>
                </div>

                <div className="flex gap-2">
                    <p className="mt-1 text-xs font-medium text-gray-700">
                        {task.deadline
                            ? formatDeadline(task.deadline)
                            : "No deadline"}
                    </p>
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => onEdit(task)}
                        className="text-blue-600 hover:underline"
                    >
                        Edit
                    </button>

                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => onDelete(task.id)}
                        className="text-red-600 hover:underline"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

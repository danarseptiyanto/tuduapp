import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";

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

    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if (!task.deadline) {
            setTimeLeft("No deadline");
            return;
        }

        const updateTimer = () => {
            const now = new Date();

            // Treat as "Floating Time": ignore the 'Z' (UTC) if present.
            // This forces the browser to interpret the time string as local time.
            let dateString = task.deadline;
            if (dateString.endsWith("Z")) {
                dateString = dateString.slice(0, -1);
            }

            const date = new Date(dateString);
            const diff = date - now;

            if (diff <= 0) {
                setTimeLeft("Overdue");
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            let result = "";
            if (days > 0) result += `${days}d `;
            if (hours > 0 || days > 0) result += `${hours}h `;
            result += `${minutes}m`;
            setTimeLeft(result);
        };

        updateTimer();
        const intervalId = setInterval(updateTimer, 60000); // Update every minute

        return () => clearInterval(intervalId);
    }, [task.deadline]);

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`aspect-square cursor-grab rounded-[18px] select-none ${bgColor}`}
        >
            <div className="flex h-full flex-col justify-between">
                <div className="flex-1 px-6 pt-6">
                    <p className="text-[14px] leading-snug">
                        {task.description}
                    </p>
                </div>
                <div className="flex justify-between gap-2 pr-3.5 pb-3.5 pl-6">
                    <p className="mt-1 text-xs font-light">{timeLeft}</p>
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => onEdit(task)}
                        className="flex aspect-square w-9 cursor-pointer items-center justify-center rounded-full bg-black"
                    >
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.9219 3.86874C14.292 3.49873 14.4999 2.99685 14.5 2.47351C14.5001 1.95017 14.2922 1.44823 13.9222 1.07813C13.5522 0.708025 13.0503 0.500066 12.527 0.5C12.0037 0.499934 11.5018 0.707768 11.1317 1.07778L1.78937 10.4223C1.62684 10.5843 1.50664 10.7839 1.43936 11.0033L0.514654 14.0498C0.496563 14.1103 0.495196 14.1746 0.5107 14.2359C0.526204 14.2971 0.557999 14.353 0.602712 14.3977C0.647426 14.4423 0.70339 14.474 0.764667 14.4894C0.825945 14.5048 0.890249 14.5034 0.950758 14.4852L3.99789 13.5612C4.21711 13.4945 4.41661 13.375 4.57889 13.2133L13.9219 3.86874Z"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <div className="hidden">
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
        </div>
    );
}

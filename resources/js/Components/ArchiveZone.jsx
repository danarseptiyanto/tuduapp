import { useDroppable } from "@dnd-kit/core";

export default function ArchiveZone() {
    const { setNodeRef, isOver } = useDroppable({ id: "archive" });
    return (
        <div
            ref={setNodeRef}
            className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 px-6 py-16 ${
                isOver
                    ? "border-green-600 bg-green-100 text-black"
                    : "text-gray-600"
            }`}
        >
            <svg
                width="29"
                height="30"
                viewBox="0 0 29 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M25.375 13.32V23.75C25.375 24.413 25.1204 25.0489 24.6672 25.5178C24.214 25.9866 23.5993 26.25 22.9583 26.25H6.04167C5.40073 26.25 4.78604 25.9866 4.33283 25.5178C3.87961 25.0489 3.625 24.413 3.625 23.75V6.25C3.625 5.58696 3.87961 4.95107 4.33283 4.48223C4.78604 4.01339 5.40073 3.75 6.04167 3.75H20.9573M10.875 13.75L14.5 17.5L26.5833 5"
                    stroke="#00C950"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <p className="max-w-[190px] pt-3 text-center text-sm">
                Drag the task here to mark it as done
            </p>
        </div>
    );
}

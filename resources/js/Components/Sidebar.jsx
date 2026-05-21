import ArchiveZone from "./ArchiveZone";

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

export default function Sidebar({ archivedTasks = [], onUnarchive, children }) {
    return (
        <div className="min-h-dvh w-0 bg-white p-0 md:w-[396px] md:p-6">
            <div className="sticky top-6 z-40">
                {children}
                <div className="hidden md:block">
                    <p className="pt-5 pb-4 font-medium">Last 5 task done</p>
                    <div>
                        {archivedTasks.length === 0 ? (
                            <div className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#F9C974]/50 py-7">
                                <p className="text-sm text-gray-500">
                                    No archived tasks yet.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {archivedTasks.map((task) => {
                                    const bgColor =
                                        colorMap[task.color] || "bg-gray-100";
                                    return (
                                        <div
                                            key={task.id}
                                            className={`min-h-[65px] rounded-xl px-5 py-4 text-sm opacity-80 ${bgColor}`}
                                        >
                                            <p className="whitespace-pre-wrap line-clamp-2 text-[13px] leading-snug">
                                                {task.description}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    onUnarchive(task.id)
                                                }
                                                className="mt-2 inline-flex cursor-pointer items-center gap-1 text-xs text-gray-600 hover:text-gray-800"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    className="h-3 w-3"
                                                    fill="currentColor"
                                                >
                                                    <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
                                                </svg>
                                                Restore
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

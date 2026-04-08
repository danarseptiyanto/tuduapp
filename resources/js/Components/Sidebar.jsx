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

export default function Sidebar({ archivedTasks = [] }) {
    return (
        <div className="h-svh w-[396px] bg-white p-6">
            {/* ARCHIVE DROP ZONE */}
            <ArchiveZone />
            <div>
                <p className="pt-5 pb-4 font-medium">Last 5 task done</p>
                <div>
                    {archivedTasks.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No archived tasks yet.
                        </p>
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
                                        <p className="line-clamp-2 text-[13px] leading-snug">
                                            {task.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

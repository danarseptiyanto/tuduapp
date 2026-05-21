import { router, Link } from "@inertiajs/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { usePWAInstall } from "@/Hooks/usePWAInstall";
import { useDarkMode } from "@/Hooks/useDarkMode";

export default function TaskHeader({ onAddTask, isCreating }) {
    const { canInstall, isInstalled, install } = usePWAInstall();
    const { isDark, toggle } = useDarkMode();
    return (
        <div className="fixed right-8 bottom-24 z-30 flex flex-col items-end justify-between gap-2 md:hidden">
            <Menu>
                <MenuButton className="flex aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#F9C974] p-3 text-sm font-medium transition-all hover:bg-amber-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-user-pen-icon lucide-user-pen"
                    >
                        <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
                        <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                        <circle cx="10" cy="7" r="4" />
                    </svg>
                </MenuButton>
                <MenuItems
                    anchor="bottom end"
                    className="z-40 mt-2 w-44 min-w-36 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg outline-none"
                >
                    {canInstall && !isInstalled && (
                        <MenuItem>
                            <button
                                className="inline-flex w-full items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-[#F9C974]/20 hover:text-gray-900"
                                onClick={install}
                            >
                                Install App
                            </button>
                        </MenuItem>
                    )}
                    <MenuItem>
                        <button
                            className="inline-flex w-full items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-[#F9C974]/20 hover:text-gray-900"
                            onClick={toggle}
                        >
                            {isDark ? "Light Mode" : "Dark Mode"}
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            className="inline-flex w-full items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-[#F9C974]/20 hover:text-gray-900"
                            href="/profile"
                        >
                            Profile
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            className="inline-flex w-full items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-[#F9C974]/20 hover:text-gray-900"
                            href="/profile"
                        >
                            Change Password
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <button
                            className="inline-flex w-full items-center rounded-lg p-2 text-sm text-red-600 hover:bg-[#F9C974]/20 hover:text-red-700"
                            onClick={() => router.post(route("logout"))}
                        >
                            Log Out
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
            <button
                onClick={onAddTask}
                disabled={isCreating}
                className={`flex h-14 cursor-pointer items-center gap-2 rounded-full px-7 text-sm font-medium shadow-lg shadow-black transition-all hover:bg-amber-400 ${
                    isCreating
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-[#F9C974]"
                }`}
            >
                {isCreating ? (
                    <>
                        <svg
                            className="h-4 w-4 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                        Creating...
                    </>
                ) : (
                    "Add Taskx"
                )}
            </button>
        </div>
    );
}

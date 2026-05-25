import { router, Link } from "@inertiajs/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { usePWAInstall } from "@/Hooks/usePWAInstall";
import { useDarkMode } from "@/Hooks/useDarkMode";
export default function TaskHeader({
	onAddTask,
	isCreating,
	userName,
	children,
}) {
	const { canInstall, isInstalled, install } = usePWAInstall();
	const { isDark, toggle } = useDarkMode();
	return (
		<div className="hidden items-center justify-between md:flex">
			<h1 className="text-3xl text-gray-900 dark:text-[#D1CFC0]">
				Hi <span className="font-semibold">{userName}</span>
			</h1>
			<div className="flex items-center gap-2">
				{children}
				<button
					onClick={onAddTask}
					disabled={isCreating}
					className={`flex h-10 cursor-pointer items-center gap-2 rounded-full bg-gray-300 px-5 text-sm font-medium transition-all hover:bg-gray-400 dark:bg-[#D1CFC0] dark:hover:bg-[#F9C974] ${
						isCreating
							? "cursor-not-allowed bg-gray-400"
							: "bg-black"
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
						"Add Task"
					)}
				</button>
				<Menu>
					<MenuButton className="flex aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-300 p-3 text-sm font-medium transition-all hover:bg-gray-400 dark:bg-[#D1CFC0] dark:hover:bg-[#F9C974]">
						<svg
							className="h-4.5 w-4.5 fill-gray-800 dark:fill-black"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
						>
							<path d="M16 18V20H5V18H16ZM21 11V13H3V11H21ZM19 4V6H8V4H19Z" />
						</svg>
					</MenuButton>
					<MenuItems
						anchor="bottom end"
						className="z-10 mt-2 w-44 min-w-36 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg outline-none dark:border-white/15 dark:bg-[#292929] dark:shadow-black/30"
					>
						<MenuItem>
							<Link
								className="inline-flex w-full items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-[#F9C974]/20 hover:text-gray-900 dark:text-[#D1CFC0] dark:hover:text-white"
								href="/tasks/categories"
							>
								Manage Categories
							</Link>
						</MenuItem>
						{canInstall && !isInstalled && (
							<MenuItem>
								<button
									className="inline-flex w-full items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-[#F9C974]/20 hover:text-gray-900 dark:text-[#D1CFC0] dark:hover:text-white"
									onClick={install}
								>
									Install App
								</button>
							</MenuItem>
						)}

						<MenuItem>
							<button
								className="inline-flex w-full items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-[#F9C974]/20 hover:text-gray-900 dark:text-[#D1CFC0] dark:hover:text-white"
								onClick={toggle}
							>
								{isDark ? "Light Mode" : "Dark Mode"}
							</button>
						</MenuItem>

						<MenuItem>
							<Link
								className="inline-flex w-full items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-[#F9C974]/20 hover:text-gray-900 dark:text-[#D1CFC0] dark:hover:text-white"
								href="/profile"
							>
								Profile
							</Link>
						</MenuItem>
						<MenuItem>
							<Link
								className="inline-flex w-full items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-[#F9C974]/20 hover:text-gray-900 dark:text-[#D1CFC0] dark:hover:text-white"
								href="/profile"
							>
								Change Password
							</Link>
						</MenuItem>
						<MenuItem>
							<button
								className="inline-flex w-full items-center rounded-lg p-2 text-sm text-red-600 hover:bg-[#F9C974]/20 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
								onClick={() => router.post(route("logout"))}
							>
								Log Out
							</button>
						</MenuItem>
					</MenuItems>
				</Menu>
			</div>
		</div>
	);
}

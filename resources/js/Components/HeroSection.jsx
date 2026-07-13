import { Link } from "@inertiajs/react";
import ThemeToggle from "./ThemeToggle";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { usePWAInstall } from "@/Hooks/usePWAInstall";
import { useDarkMode } from "@/Hooks/useDarkMode";

export default function HeroSection() {
	const { canInstall, isInstalled, install } = usePWAInstall();
	const { isDark, toggle } = useDarkMode();

	return (
		<div className="bg-linear-to-b from-[#F8F6F5] via-white to-black/20 dark:from-[#1A1A1A] dark:via-[#1A1A1A] dark:to-black/40">
			<div className="max-w-340 px-5 pt-11 pb-9 md:mx-auto md:pb-16">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-[#F9C974] md:h-12.5 md:w-12.5">
							<svg
								className="h-6 w-6 fill-gray-800 dark:fill-black"
								viewBox="0 0 176 178"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M149.273 107.52C149.273 100.216 155.197 94.292 162.502 94.292C169.806 94.292 175.73 100.216 175.73 107.52C175.73 126.821 167.905 144.296 155.255 156.947C142.604 169.597 125.13 177.422 105.828 177.422C86.5267 177.422 69.0527 169.597 56.402 156.947C43.7513 144.296 35.9267 126.822 35.9267 107.52H35.979L35.8378 13.1761C35.8378 5.89952 41.7373 0 49.0139 0C56.2905 0 62.19 5.89952 62.19 13.1761L62.3312 107.52H62.3835C62.3835 119.519 67.2463 130.38 75.1076 138.241C82.9689 146.102 93.8302 150.965 105.828 150.965C117.827 150.965 128.688 146.102 136.549 138.241C144.41 130.38 149.273 119.519 149.273 107.52Z" />
								<path d="M73.9862 103.701C68.8211 98.5645 68.7971 90.213 73.9339 85.048C79.0708 79.8829 87.4222 79.8589 92.5873 84.9957L106.413 98.6902L150.034 54.1705C155.143 48.9772 163.494 48.9065 168.689 54.0151C173.883 59.1237 173.953 67.4751 168.845 72.6699L115.907 126.696C110.77 131.861 102.419 131.885 97.2538 126.749L73.9876 103.701H73.9862Z" />
								<path d="M114.424 42.1948C121.729 42.1948 127.652 48.1184 127.652 55.4232C127.652 62.728 121.729 68.6516 114.424 68.6516H13.2284C5.92353 68.6516 0 62.728 0 55.4232C0 48.1184 5.92353 42.1948 13.2284 42.1948H114.424Z" />
							</svg>
						</div>
						<p className="text-xl font-semibold dark:text-[#D1CFC0]">
							Tudus
						</p>
					</div>
					<div className="hidden items-center gap-2 md:flex">
						<Link
							href="/tasks"
							className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full px-1 text-[15px] font-medium whitespace-nowrap text-black dark:text-[#D1CFC0]"
						>
							Install App
						</Link>
						<Link
							href="/tasks"
							className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#D9D9D9] px-4 text-[15px] font-medium whitespace-nowrap text-black transition-all hover:bg-gray-400 dark:bg-[#D1CFC0] dark:hover:bg-[#D1CFC0]/80"
						>
							Open App
						</Link>
						<div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#D9D9D9] transition-all hover:bg-gray-400 dark:bg-[#D1CFC0] dark:hover:bg-[#D1CFC0]/80">
							<ThemeToggle />
						</div>
					</div>
					<Menu>
						<MenuButton className="flex aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-300 p-3 text-sm font-medium transition-all hover:bg-gray-400 md:hidden dark:bg-[#D1CFC0] dark:hover:bg-[#F9C974]">
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
									href="/tasks"
								>
									Open Web App
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
						</MenuItems>
					</Menu>
				</div>
				<p className="max-w-231.25 pt-28 text-[42px] leading-11 font-medium tracking-tight text-black md:text-[64px] md:leading-18 dark:text-white">
					Simple and serene task app that leaves you and your task
					alone
				</p>
				<div className="flex items-center pt-8 md:gap-1">
					<Link
						href="/tasks"
						className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#F9C974] px-4 text-[15px] font-medium whitespace-nowrap text-black transition-all hover:bg-amber-400 md:h-12.5 md:px-5 md:text-base"
					>
						Open App
					</Link>
					<Link
						href="/tasks"
						className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium whitespace-nowrap text-black transition-all md:h-12.5 md:text-base dark:text-white"
					>
						Install App
					</Link>
				</div>
				<div className="hero:-mx-5 mx-0 hidden md:block">
					<img
						src="/img/ss-app-light.png"
						className="mt-15 rounded-2xl border border-[#E5E5E5] dark:hidden dark:border-[#343434]/70"
						alt=""
					/>
					<img
						src="/img/ss-app-dark.png"
						className="mt-15 hidden rounded-2xl border border-[#E5E5E5] dark:block dark:border-[#343434]/70"
						alt=""
					/>
				</div>
				<div className="block md:hidden">
					<img
						src="/img/mb-ss-app-light.png"
						className="mt-8 rounded-xl border border-[#E5E5E5] dark:hidden dark:border-[#343434]/70"
						alt=""
					/>
					<img
						src="/img/mb-ss-app-dark.png"
						className="mt-8 hidden rounded-xl border border-[#E5E5E5] dark:block dark:border-[#343434]/70"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}

import { Link } from "@inertiajs/react";
import { usePWAInstall } from "@/Hooks/usePWAInstall";

export default function CTASection() {
	const { canInstall, isInstalled, install } = usePWAInstall();

	return (
		<div className="bg-[#F8F6F5] dark:bg-[#1A1A1A]">
			<div className="max-w-340 px-5 py-10 md:mx-auto md:py-20">
				<p className="mx-auto max-w-170 text-center text-[32px] leading-tight tracking-tight text-black md:text-[64px] md:leading-18.75 dark:text-white">
					Simple, sturdy, and free{" "}
					<span className="font-semibold">Go give it a try!</span>
				</p>
				<div className="mt-5 flex flex-col items-center justify-center gap-3 md:mt-6">
					<Link
						href="/tasks"
						className="flex h-10 w-fit cursor-pointer items-center justify-center gap-2 rounded-full bg-[#F9C974] px-5 text-sm font-medium whitespace-nowrap text-black transition-all hover:bg-amber-400 md:h-12.5 md:text-base"
					>
						Open Web App
					</Link>
					<p className="text-sm text-[#5B5B5B] underline-offset-2 md:text-base dark:text-[#A1A1A1]">
						or install the{" "}
						<button
							onClick={install}
							className="underline hover:text-[#F9C974]"
						>
							App for your device
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}

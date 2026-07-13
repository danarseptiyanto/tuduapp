export default function Footer() {
	return (
		<div className="border-t border-t-black/10 bg-[#F8F6F5] dark:border-t-white/10 dark:bg-[#1A1A1A]">
			<div className="flex max-w-340 justify-between px-5 py-8 text-sm text-[#5B5B5B] md:mx-auto dark:text-[#A1A1A1]">
				<p>Danar Septiyanto © 2026</p>
				<div className="flex gap-4">
					<a
						href="https://github.com/danarseptiyanto/tuduapp"
						className="flex items-center gap-1.5"
						target="_blank"
					>
						GitHub
					</a>
					<a
						href="https://github.com/danarseptiyanto/tuduapp"
						className="flex items-center gap-1.5"
						target="_blank"
					>
						Docs
					</a>
				</div>
			</div>
		</div>
	);
}

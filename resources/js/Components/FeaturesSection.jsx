export default function FeaturesSection() {
	return (
		<div className="bg-[#F8F6F5] dark:bg-[#1A1A1A]">
			<div className="max-w-340 px-5 py-10 md:mx-auto md:py-20">
				<p className="pb-16 text-2xl leading-tight font-medium text-black md:text-[45px] md:leading-13 dark:text-white">
					Some apps are doing too much, some are too less, but Tudus
					is built to be just right.{" "}
					<span className="text-[#626262] dark:text-[#D1CFC0]">
						It provides what's essential and leave all the noises
						behind so you can focus on ticking all your task
					</span>
				</p>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="col-span-1 w-full rounded-xl border border-[#E5E5E5] bg-white p-5 pr-0 md:col-span-2 md:p-10 md:pr-0 dark:border-[#343434] dark:bg-[#2A2A2A]">
						<img
							src="/img/image1-light.png"
							className="mb-6 hidden w-full rounded-l-lg md:block"
						/>
						<img
							src="/img/image3-light.png"
							className="mb-4 block w-full rounded-l-lg md:hidden"
						/>
						<p className="inline-flex pb-1 text-lg font-medium tracking-tight text-black md:pb-1.5 md:text-xl dark:text-white">
							Simple yet powerful
							<span className="hidden md:block">
								, complete but get out of the way
							</span>
						</p>
						<p className="mr-10 max-w-175 text-sm text-[#5B5B5B] md:text-[15px] dark:text-[#A1A1A1]">
							We built the tool to be sturdy and complete, a task
							manager app shouldn't be a hassle{" "}
							<span className="hidden md:block">
								to use since you just wanna get things done
							</span>
						</p>
					</div>
					<div className="w-full rounded-xl border border-[#E5E5E5] bg-white p-5 pr-0 md:p-10 md:pr-0 dark:border-[#343434] dark:bg-[#2A2A2A]">
						<img
							src="/img/image2-light.png"
							className="mb-6 hidden w-full rounded-l-lg md:block"
						/>
						<img
							src="/img/image3-light.png"
							className="mb-4 block w-full rounded-l-lg md:hidden"
						/>
						<p className="pb-1 text-lg font-medium tracking-tight text-black md:pb-1.5 md:text-xl dark:text-white">
							Set deadline on your task
						</p>
						<p className="mr-10 max-w-175 text-sm text-[#5B5B5B] md:text-[15px] dark:text-[#A1A1A1]">
							On every task added, you can set the deadline.
							though of course you can set it to none
						</p>
					</div>
					<div className="w-full rounded-xl border border-[#E5E5E5] bg-white p-5 pr-0 md:p-10 md:pr-0 dark:border-[#343434] dark:bg-[#2A2A2A]">
						<img
							src="/img/image3-light.png"
							className="mb-6 hidden w-full rounded-l-lg md:block"
						/>
						<img
							src="/img/image3-light.png"
							className="mb-4 block w-full rounded-l-lg md:hidden"
						/>
						<p className="pb-1 text-lg font-medium tracking-tight text-black md:pb-1.5 md:text-xl dark:text-white">
							The mobile app version
						</p>
						<p className="mr-10 max-w-175 text-sm text-[#5B5B5B] md:text-[15px] dark:text-[#A1A1A1]">
							An Android app version of the tool to make it even
							more compact and effortless to use
						</p>
					</div>
					<div className="col-span-1 w-full rounded-xl border border-[#E5E5E5] bg-white p-5 pr-0 md:col-span-2 md:p-10 md:pr-0 dark:border-[#343434] dark:bg-[#2A2A2A]">
						<img
							src="/img/image4-light.png"
							className="mb-6 hidden w-full rounded-l-lg md:block"
						/>
						<img
							src="/img/image3-light.png"
							className="mb-4 block w-full rounded-l-lg md:hidden"
						/>
						<p className="pb-1 text-lg font-medium tracking-tight text-black md:pb-1.5 md:text-xl dark:text-white">
							Fully open source
						</p>
						<p className="mr-10 max-w-175 text-sm text-[#5B5B5B] md:text-[15px] dark:text-[#A1A1A1]">
							Transparent by design. The entire codebase is public
							so you can audit it, self-host it
							<span className="hidden md:block">
								, or even contribute because we believe you
								should completely trust the tool that runs your
								day.
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";

export default function AccordionItem({ question, children }) {
	return (
		<Disclosure
			as="div"
			className="rounded-xl border border-[#E5E5E5] p-4 px-5 md:p-6 md:px-6 dark:border-[#343434] dark:bg-[#2A2A2A]/50 dark:hover:bg-[#2A2A2A]/65"
		>
			<DisclosureButton className="group flex w-full items-center justify-between">
				<span className="text-left text-base font-medium text-[#5B5B5B] group-data-hover:text-[#5B5B5B]/80 md:text-lg dark:text-[#D1D1D1] dark:group-data-hover:text-[#D1D1D1]/80">
					{question}
				</span>
				<div className="size-5 fill-[#5B5B5B]/60 group-data-hover:fill-[#5B5B5B]/50 group-data-open:rotate-180 dark:fill-[#D1D1D1]/60 dark:group-data-hover:fill-[#D1D1D1]/50">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className="fill-gray-900 dark:fill-gray-300"
					>
						<path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
					</svg>
				</div>
			</DisclosureButton>
			<DisclosurePanel className="mt-2 text-sm text-[#5B5B5B]/70 md:text-base dark:text-[#A1A1A1]/70">
				{children}
			</DisclosurePanel>
		</Disclosure>
	);
}

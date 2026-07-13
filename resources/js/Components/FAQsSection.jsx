import AccordionItem from "@/Components/AccordionItem";

export default function FAQsSection() {
	return (
		<div className="border-y border-t-[#E5E5E5] dark:border-[#343434] dark:bg-[#191919]">
			<div className="w-full px-4 py-20">
				<p className="mx-auto max-w-108.75 pb-10 text-center text-[45px] leading-14 font-medium tracking-tight text-black dark:text-white">
					Frequently Asked Questions
				</p>
				<div className="mx-auto w-full max-w-5xl space-y-3.5">
					<AccordionItem question="What is your refund policy?">
						If you're unhappy with your purchase, we'll refund you
						in full.
					</AccordionItem>
					<AccordionItem question="What is your refund policy?">
						If you're unhappy with your purchase, we'll refund you
						in full.
					</AccordionItem>
					<AccordionItem question="What is your refund policy?">
						If you're unhappy with your purchase, we'll refund you
						in full.
					</AccordionItem>
					<AccordionItem question="What is your refund policy?">
						If you're unhappy with your purchase, we'll refund you
						in full.
					</AccordionItem>
					<AccordionItem question="What is your refund policy?">
						If you're unhappy with your purchase, we'll refund you
						in full.
					</AccordionItem>
				</div>
			</div>
		</div>
	);
}

import AccordionItem from "@/Components/AccordionItem";

export default function FAQsSection() {
	return (
		<div className="border-y border-t-[#E5E5E5] dark:border-[#343434] dark:bg-[#191919]">
			<div className="w-full px-4 py-10 md:py-20">
				<p className="mx-auto max-w-108.75 pb-5 text-center text-2xl leading-14 font-medium tracking-tight text-black md:pb-10 md:text-[45px] dark:text-white">
					Frequently Asked Questions
				</p>
				<div className="mx-auto w-full max-w-5xl space-y-3 md:space-y-3.5">
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

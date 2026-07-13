import AccordionItem from "@/Components/AccordionItem";

export default function FAQsSection() {
	return (
		<div className="border-y border-t-[#E5E5E5] dark:border-[#343434] dark:bg-[#191919]">
			<div className="w-full px-4 py-10 md:py-20">
				<p className="mx-auto max-w-108.75 pb-5 text-center text-2xl leading-14 font-medium tracking-tight text-black md:pb-10 md:text-[45px] dark:text-white">
					Frequently Asked Questions
				</p>
				<div className="mx-auto w-full max-w-5xl space-y-3 md:space-y-3.5">
					<AccordionItem question="Is Tudus really free?">
						Yes, Tudus is completely free with no hidden costs, no
						ads, and no premium tiers. It's also open source, so you
						can view the entire codebase on GitHub.
					</AccordionItem>
					<AccordionItem question="How is Tudus different?">
						Tudus is built to be "just right", not bloated with
						unnecessary features, but not too minimal either. It
						focuses on what's essential: tasks, categories,
						deadlines with live countdowns, and a serene
						drag-and-drop interface that stays out of your way.
					</AccordionItem>
					<AccordionItem question="Can I use Tudus on my phone?">
						Absolutely! Tudus is a Progressive Web App (PWA), which
						means you can install it directly on your phone, tablet,
						or desktop, no app store required. It works offline too,
						so you can manage your tasks anywhere.
					</AccordionItem>
					<AccordionItem question="How does voice input work?">
						When creating a task, just click the microphone button
						and start speaking. Tudus uses your browser's built-in
						speech recognition to convert your voice into text, a
						quick, hands-free way to capture tasks on the go.
					</AccordionItem>
					<AccordionItem question="Is my data safe?">
						Your data stays on the server you're connected to. Tudus
						is open source and transparent by design, so you can
						audit the code yourself, self-host it if you prefer, and
						there are no third-party trackers or analytics.
					</AccordionItem>
				</div>
			</div>
		</div>
	);
}

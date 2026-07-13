export default function Checkbox({ className = "", ...props }) {
	return (
		<input
			{...props}
			type="checkbox"
			className={
				"rounded-sm border-gray-300 text-indigo-600 shadow-xs focus:ring-indigo-500 dark:border-white/15 dark:bg-transparent" +
				className
			}
		/>
	);
}

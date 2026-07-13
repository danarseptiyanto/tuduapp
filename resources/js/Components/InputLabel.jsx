export default function InputLabel({
	value,
	className = "",
	children,
	...props
}) {
	return (
		<label
			{...props}
			className={
				`block text-[13px] font-medium text-gray-700 md:text-sm dark:text-[#d1cfc0] ` +
				className
			}
		>
			{value ? value : children}
		</label>
	);
}

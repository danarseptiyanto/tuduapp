export default function DangerButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `flex h-10 cursor-pointer items-center gap-2 rounded-full bg-red-600 px-5 text-sm font-medium whitespace-nowrap text-white transition-all hover:bg-gray-400${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

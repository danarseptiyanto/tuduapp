import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                "mt-2 rounded-lg border-gray-300 text-xs focus:border-indigo-500 focus:ring-indigo-500 md:rounded-xl md:text-base dark:border-white/15 dark:bg-[#1F1F1F]/0 dark:text-[#D1CFC0] dark:placeholder-[#d1cfc0]" +
                className
            }
            ref={localRef}
        />
    );
});

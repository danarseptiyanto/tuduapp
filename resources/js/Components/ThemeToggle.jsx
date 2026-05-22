import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }) {
    const [isDark, setIsDark] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);

    useEffect(() => {
        const stored = localStorage.theme;
        const isDarkMode = stored === "dark";
        setIsDark(isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggle = () => {
        setIsDark((prev) => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add("dark");
                localStorage.theme = "dark";
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.theme = "light";
            }
            const themeColorMeta = document.querySelector('meta[name="theme-color"]');
            if (themeColorMeta) {
                themeColorMeta.setAttribute("content", next ? "#1f2937" : "#f9fafb");
            }
            return next;
        });
        setIsSpinning(true);
    };

    useEffect(() => {
        if (!isSpinning) return;
        const timer = setTimeout(() => setIsSpinning(false), 600);
        return () => clearTimeout(timer);
    }, [isDark, isSpinning]);

    const spinClass = isSpinning ? "animate-[spin_0.6s_ease-in-out]" : "";

    return (
        <button
            onClick={toggle}
            className={`flex h-[48px] w-[48px] items-center justify-center rounded-xl text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${className}`}
        >
            {isDark ? (
                <svg
                    className={`h-5 w-5 ${spinClass}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ) : (
                <svg
                    className={`h-5 w-5 ${spinClass}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            )}
        </button>
    );
}

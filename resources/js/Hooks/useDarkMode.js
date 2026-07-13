import { useEffect, useState } from "react";

export function useDarkMode() {
	const [isDark, setIsDark] = useState(() => {
		return localStorage.getItem("theme") === "dark";
	});

	useEffect(() => {
		localStorage.setItem("theme", isDark ? "dark" : "light");
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		const themeColorMeta = document.querySelector(
			'meta[name="theme-color"]',
		);
		if (themeColorMeta) {
			themeColorMeta.setAttribute(
				"content",
				isDark ? "#1F1F1F" : "#f9fafb",
			);
		}
	}, [isDark]);

	const toggle = () => setIsDark((prev) => !prev);

	return { isDark, toggle };
}

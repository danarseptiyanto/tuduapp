import { useState, useEffect } from "react";

export function usePWAInstall() {
	const [installPrompt, setInstallPrompt] = useState(null);
	const [isInstalled, setIsInstalled] = useState(false);

	useEffect(() => {
		// Check if already installed
		if (window.matchMedia("(display-mode: standalone)").matches) {
			setIsInstalled(true);
			return;
		}

		const handler = (e) => {
			e.preventDefault(); // suppress the automatic prompt
			setInstallPrompt(e);
		};

		window.addEventListener("beforeinstallprompt", handler);

		// Detect when user installs via any method
		window.addEventListener("appinstalled", () => {
			setIsInstalled(true);
			setInstallPrompt(null);
		});

		return () => window.removeEventListener("beforeinstallprompt", handler);
	}, []);

	const install = async () => {
		if (!installPrompt) return;

		installPrompt.prompt();

		const { outcome } = await installPrompt.userChoice;

		if (outcome === "accepted") {
			setIsInstalled(true);
			setInstallPrompt(null);
		}
	};

	return {
		canInstall: !!installPrompt && !isInstalled,
		isInstalled,
		install,
	};
}

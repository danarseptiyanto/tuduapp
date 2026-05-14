import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import { toast } from "sonner";

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});

const updateSW = registerSW({
    onNeedRefresh() {
        toast("Update available", {
            description: "A new version is ready.",
            action: {
                label: "Reload",
                onClick: () => updateSW(true),
            },
            duration: Infinity,
        });
    },
    onOfflineReady() {
        toast.success("Ready to work offline");
    },
});

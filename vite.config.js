import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		laravel({
			input: "resources/js/app.jsx",
			refresh: true,
		}),
		react(),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "null",

			devOptions: {
				enabled: true,
				type: "module", // ← add this
				navigateFallback: "/", // ← add this
			},
			// Manifest — controls install prompt & app shell appearance
			manifest: {
				name: "Tudus",
				short_name: "Tudus",
				description: "Tudus by danars.net",
				theme_color: "#F9C974",
				background_color: "#F9C974",
				display: "standalone",
				orientation: "portrait",
				scope: "/",
				start_url: "/",
				icons: [
					{
						src: "/icons/pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/icons/pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "/icons/pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable", // required for Android adaptive icons
					},
				],
			},
			server: {
				https: {
					key: "./localhost-key.pem",
					cert: "./localhost.pem",
				},
				host: "localhost",
			},

			// Workbox — service worker & caching strategy
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff2}"],
				runtimeCaching: [
					{
						// Cache API calls with network-first
						urlPattern: /^https?.*\/api\/.*/i,
						handler: "NetworkFirst",
						options: {
							cacheName: "api-cache",
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24, // 1 day
							},
							networkTimeoutSeconds: 10,
						},
					},
					{
						// Cache Inertia page loads with stale-while-revalidate
						urlPattern: /^https?:\/\/[^/]+\/.*/i,
						handler: "StaleWhileRevalidate",
						options: {
							cacheName: "pages-cache",
							expiration: {
								maxEntries: 30,
								maxAgeSeconds: 60 * 60 * 24,
							},
						},
					},
				],
			},
		}),
	],
});

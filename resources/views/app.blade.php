<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <!-- PWA meta tags -->
    <meta name="theme-color" content="#1F1F1F" />
    <link rel="apple-touch-icon" href="/icons/pwa-192x192.png" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <!-- Scripts -->
    @routes
    <script>
        (function() {
            // Dark mode is the default. Only go light if the user explicitly chose it.
            var isLight = localStorage.getItem('theme') === 'light';
            if (isLight) {
                document.documentElement.classList.remove('dark');
                document.querySelector('meta[name="theme-color"]').setAttribute('content', '#f9fafb');
            } else {
                document.documentElement.classList.add('dark');
            }
        })();
    </script>
    @viteReactRefresh
    @vite(["resources/js/app.jsx", "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>

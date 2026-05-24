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
    <meta name="theme-color" content="#f9fafb" />
    <link rel="apple-touch-icon" href="/icons/pwa-192x192.png" />
    <link rel="manifest" href="/manifest.webmanifest" />

    <!-- Scripts -->
    @routes
    <script>
        (function() {
            var isDark = localStorage.getItem('theme') === 'dark';
            if (isDark) {
                document.documentElement.classList.add('dark');
                document.querySelector('meta[name="theme-color"]').setAttribute('content', '#1F1F1F');
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
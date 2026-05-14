<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', fn () => redirect()->route('tasks.index'));

Route::get('/dashboard', fn () => Inertia::render('Dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// routes/web.php
Route::middleware('auth')->group(function () {
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::patch('/tasks/{task}', [TaskController::class, 'update']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
    Route::post('/tasks/{task}/archive', [TaskController::class, 'archive']);
    Route::post('/tasks/{task}/unarchive', [TaskController::class, 'unarchive']);
    Route::post('/tasks/reorder', [TaskController::class, 'reorder']);
});
Route::get('/manifest.webmanifest', function () {
    $path = public_path('build/manifest.webmanifest');
    
    abort_if(!file_exists($path), 404);
    
    return response()->file($path, [
        'Content-Type' => 'application/manifest+json',
    ]);
});

Route::get('/sw.js', function () {
    $path = public_path('build/sw.js');

    abort_if(!file_exists($path), 404);

    return response()->file($path, [
        'Content-Type' => 'application/javascript',
        'Service-Worker-Allowed' => '/',
    ]);
});

Route::get('/workbox-{file}', function (string $file) {
    $path = public_path('build/workbox-' . $file);

    abort_if(!file_exists($path), 404);

    return response()->file($path, [
        'Content-Type' => 'application/javascript',
    ]);
});

require __DIR__.'/auth.php';

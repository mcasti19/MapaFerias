<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    //     return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/ferias', function () {
    return Inertia::render('Ferias');
})->middleware(['auth', 'verified'])->name('ferias');

//Listar Ferias
Route::get('/lista-ferias', function () {
    return Inertia::render('ListarFerias');
})->middleware(['auth', 'verified'])->name('lista-ferias');

Route::get('/ferias/{id}', function ($id) {
    return Inertia::render('FeriaDetails', [
        'feriaId' => $id
    ]);
})->middleware(['auth', 'verified'])->name('ferias.show');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

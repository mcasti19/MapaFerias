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

// PRIMERO las rutas específicas
Route::get('/ferias/create', [App\Http\Controllers\FeriaController::class, 'create'])
    //->middleware(['auth', 'verified'])
    ->name('ferias.create');

// DESPUÉS las rutas con parámetros
Route::get('/ferias/{id}', [App\Http\Controllers\FeriaController::class, 'show'])
    //->middleware(['auth', 'verified'])
    ->name('ferias.show');

// Las demás rutas pueden ir en cualquier orden después
Route::get('/ferias', [App\Http\Controllers\FeriaController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('ferias');

Route::get('/lista-ferias', [App\Http\Controllers\FeriaController::class, 'lista'])
    ->middleware(['auth', 'verified'])
    ->name('lista-ferias');

Route::post('/feria', [App\Http\Controllers\FeriaController::class, 'store'])
    //->middleware(['auth', 'verified'])
    ->name('ferias.store');
    
Route::get('/planificacion', function () {
    return Inertia::render('Planificacion/Index');
})->middleware(['auth', 'verified'])->name('planificacion');

Route::get('/cumplimiento', function () {
    return Inertia::render('Cumplimiento/Index');
})->middleware(['auth', 'verified'])->name('cumplimiento');

Route::get('/registro', function () {
    return Inertia::render('Registro/Index');
})->middleware(['auth', 'verified'])->name('registro');

Route::get('/seguimiento', function () {
    return Inertia::render('Seguimiento/Index');
})->middleware(['auth', 'verified'])->name('seguimiento');

//Listar Ferias
/*Route::get('/lista-ferias', function () {
    return Inertia::render('ListarFerias');
})->middleware(['auth', 'verified'])->name('lista-ferias');

Route::get('/ferias/{id}', function ($id) {
    return Inertia::render('FeriaDetails', [
        'feriaId' => $id
    ]);
})->middleware(['auth', 'verified'])->name('ferias.show');*/



    Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

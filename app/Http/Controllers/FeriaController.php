<?php

namespace App\Http\Controllers;
use App\Models\Feria;
use Inertia\Inertia;

use Illuminate\Http\Request;

class FeriaController extends Controller
{
    public function index()
    {
        return Inertia::render('Ferias');
    }

    public function lista()
    {
        return Inertia::render('ListarFerias');
    }

    public function show($id)
    {
        return Inertia::render('FeriaDetails', [
            'feriaId' => $id
        ]);
    }
}

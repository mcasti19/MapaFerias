<?php

namespace App\Http\Controllers;
use App\Models\Feria;
use App\Models\States;
use App\Models\Municipalities;
use App\Models\Parishes;
use App\Models\Items;
use App\Models\Status;
use App\Models\Distributed;
use Illuminate\Support\Facades\DB;
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

    public function create()
        {
            //Catálogos para que el formulario en React tenga los desplegables
            return Inertia::render('Ferias', [
                'states' =>         States::all(),
                'municipalities' => Municipalities::all(),
                'parishes' =>       Parishes::all(),
                'items' =>          Items::all(), // Para tu tabla dinámica de rubros
                //'status'  =>        Status::all(), 
            ]);
        }

    public function store(Request $request)
        {
            dd($request->all());
            // 1. Validar todo los datos sin necesidad de usar el validate
                $request->validate([
                    'sector' => 'required',
                    'lat' => 'required',
                    'lng' => 'required',
                    'items_list' => 'required|array', // Los rubros de la tabla dinámica
                ]);

                try {
                    DB::beginTransaction();

                    // 2. Crear la Feria y procesar coordenadas
                    $feria = Feria::create([
                        'id_state' => $request->id_state,
                        'id_municipality' => $request->id_municipality,
                        'id_parish' => $request->id_parish,
                        'sector' => $request->sector,
                        'mission_base' => $request->mission_base,
                        'clap' => $request->clap,
                        'circuit' => $request->circuit,
                        'coordinates' => $request->lat . ', ' . $request->lng, // Guardamos ambos
                        'full_name' => $request->full_name,
                        'cedula' => $request->cedula,
                        'phone' => $request->phone,
                        'compliance' => $request->compliance,
                        'observations' => $request->observations,
                    ]);

                    // 3. Guardar en la tabla 'distributed' (Los rubros dinámicos)
                    foreach ($request->items_list as $row) {
                        Distributed::create([
                            'id_item' => $row['id_item'],
                            'id_feria' => $feria->id_feria, // El ID recién creado
                            'tons' => $row['tons'],
                        ]);
                    }

                    DB::commit();
                    return redirect()->route('ferias.index')->with('message', 'Feria registrada con éxito');

                } catch (\Exception $e) {
                    DB::rollBack();
                    return back()->withErrors(['error' => 'Error al guardar: ' . $e->getMessage()]);
                }
            //return redirect()->route('lista-ferias')->with('message', 'Feria registrada con éxito');
        }
}

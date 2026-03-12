<?php

namespace App\Http\Controllers;
use App\Models\Feria;
use App\Models\Items;
use App\Models\Parishes;
use App\Models\Municipalities;
use App\Models\States;
use App\Models\Distributed;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class FeriasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Ferias');
    }

    /**
     * Show the form for creating a new resource.
     */
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

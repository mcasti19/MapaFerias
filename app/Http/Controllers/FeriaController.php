<?php

namespace App\Http\Controllers;
use App\Models\Feria;
use App\Models\States;
use App\Models\Municipalities;
use App\Models\Parishes;
use App\Models\Items;
use App\Models\Status;
use App\Models\Distributed;
use App\Models\Attentions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

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
    $data = [
        'states'         => \App\Models\State::orderBy('name_state')->get(),
        'municipalities' => \App\Models\Municipality::orderBy('municipality')->get(),
        'parishes'       => \App\Models\Parish::orderBy('parish')->get(),
        'items'          => \App\Models\Item::orderBy('item')->get(),
        'status'         => \App\Models\Status::all(),
    ];

    // ESTO ES LO QUE VERDADERAMENTE ENVÍA LOS DATOS A POSTMAN
    return response()->json([
        'success' => true,
        'data' => $data
    ], 200);
}

   public function store(Request $request)
    {
        $validated = $request->validate([
            'id_state'        => 'required|exists:state,id_state',
            'id_municipality' => 'required|exists:municipalities,id_municipality',
            'id_parish'       => 'required|exists:parishes,id_parish',
            'sector'          => 'required|string|max:255',
            'mission_base'    => 'required|string|max:255',
            'date'            => 'required|string|max:255',
            'clap'            => 'required|string|max:255',
            'circuit'         => 'required|string|max:255',
            'latitud'         => 'required|numeric',
            'longitud'        => 'required|numeric',
            'full_name'       => 'required|string|max:100',
            'cedula'          => 'required|string|max:20',
            'phone'           => 'required|string|max:20',
            'compliance'      => 'required|string|max:255',
            'status'          => 'required|exists:status,id_status',
            'bm'              => 'required|string|max:255',
            'emblematic'      => 'required|string|max:255',
            'observations'    => 'nullable|string|max:255',

            // Atendidos (attentions): clap, family y proteicos son enteros
            'clap_attentions'            => 'required|integer|min:0',
            'family'          => 'required|integer|min:0',
            'proteicos'        => 'required|integer|min:0',

            // Distribución por rubros
            'items_data'                    => 'required|array|min:1',
            'items_data.*.id_item'          => 'required|exists:items,id_item',
            'items_data.*.toneladas'        => 'required|numeric|min:0',
            'items_data.*.tons_received'     => 'nullable|numeric|min:0',
            'items_data.*.tons_total'        => 'nullable|numeric|min:0',

            // Despliegue (opcional)
            'deployment'                    => 'nullable|array',
            'deployment.month'              => 'nullable|string|max:255',
            'deployment.start_deployment'   => 'nullable|string|max:255',
            'deployment.end_deployment'     => 'nullable|string|max:255',
        ]);

        try {
            return DB::transaction(function () use ($validated, $request) {
                $coordinates = $validated['latitud'] . ',' . $validated['longitud'];

                $feria = Feria::create([
                    'id_state'        => $validated['id_state'],
                    'id_municipality'  => $validated['id_municipality'],
                    'id_parish'       => $validated['id_parish'],
                    'sector'          => $validated['sector'],
                    'mission_base'    => $validated['mission_base'],
                    'date'            => $validated['date'],
                    'clap'            => $validated['clap'],
                    'circuit'         => $validated['circuit'],
                    'coordinates'     => $coordinates,
                    'full_name'       => $validated['full_name'],
                    'cedula'          => $validated['cedula'],
                    'phone'           => $validated['phone'],
                    'compliance'      => $validated['compliance'],
                    'status'         => $validated['status'],
                    'bm'             => $validated['bm'],
                    'emblematic'     => $validated['emblematic'],
                    'observations'   => $validated['observations'] ?? '',
                ]);

                Attentions::create([
                    'id_feria'  => $feria->id_feria,
                    'clap'      => (int) $validated['clap_attentions'],
                    'family'    => (int) $validated['family'],
                    'proteicos' => (int) $validated['proteicos'],
                ]);

                foreach ($validated['items_data'] as $item) {
                    $tonsReceived = $item['tons_received'] ?? 0;
                    $tonsTotal    = $item['tons_total'] ?? $item['toneladas'];

                    Distributed::create([
                        'id_feria'         => $feria->id_feria,
                        'id_item'          => $item['id_item'],
                        'tons_distributed' => (string) $item['toneladas'],
                        'tons_received'    => (string) $tonsReceived,
                        'tons_total'      => (string) $tonsTotal,
                    ]);
                }

                if (class_exists(\App\Models\Deployment::class)) {
                    $dep = $validated['deployment'] ?? [];
                    if (!empty($dep['month']) || !empty($dep['start_deployment']) || !empty($dep['end_deployment'])) {
                        \App\Models\Deployment::create([
                            'id_feria'         => $feria->id_feria,
                            'month'            => $dep['month'] ?? '',
                            'start_deployment' => $dep['start_deployment'] ?? '',
                            'end_deployment'   => $dep['end_deployment'] ?? '',
                        ]);
                    }
                }
//Esto es momentanio
                return response()->json([
                'success' => true,
                'message' => 'Feria registrada correctamente',
                'data' => $feria
                ], 201);
            });
        } catch (\Throwable $e) {
    return response()->json([
        'success' => false,
        'message' => 'Error al guardar la feria',
        'error' => $e->getMessage()
    ], 500);
}
    }
}

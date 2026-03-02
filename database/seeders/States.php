<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class States extends Seeder
{
    /**
     * Run the database seeds.
     */
public function run(): void
    {
        $estados = [
            'DISTRITO CAPITAL', 'AMAZONAS', 'ANZOATEGUI', 
            'APURE', 'ARAGUA', 'BARINAS', 'BOLIVAR', 'CARABOBO', 'COJEDES', 
            'DELTA AMACURO', 'FALCON', 'GUARICO', 'LARA', 'MERIDA', 'MIRANDA', 
            'MONAGAS', 'NUEVA ESPARTA', 'PORTUGUESA', 'SUCRE', 'TACHIRA', 
            'TRUJILLO', 'YARACUY', 'ZULIA', 'LA GUAIRA', 'EL ESEQUIBO'
        ];

        foreach ($estados as $nombreEstado) {
            // Verifica si ya existe para evitar errores en ejecuciones múltiples
            Estados::firstOrCreate([
                'estado' => $nombreEstado
            ]);
        }
    }
}


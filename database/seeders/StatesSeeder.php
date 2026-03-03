<?php

namespace Database\Seeders;

use App\Models\States;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatesSeeder extends Seeder
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
            // Verifica si ya existe el nombre para no duplicar
            States::firstOrCreate([
                'state' => $nombreEstado
            ]);
        }
    }
}

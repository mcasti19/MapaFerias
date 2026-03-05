<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\States;
class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $states = [
            ['name_state' => 'Amazonas'],
            ['name_state' => 'Anzoátegui'],
            ['name_state' => 'Apure'],
            ['name_state' => 'Aragua'],
            ['name_state' => 'Barinas'],
            ['name_state' => 'Bolívar'],
            ['name_state' => 'Carabobo'],
            ['name_state' => 'Cojedes'],
            ['name_state' => 'Delta Amacuro'],
            ['name_state' => 'Distrito Capital'],
            ['name_state' => 'Falcón'],
            ['name_state' => 'Guárico'],
            ['name_state' => 'Lara'],
            ['name_state' => 'Mérida'],
            ['name_state' => 'Miranda'],
            ['name_state' => 'Monagas'],
            ['name_state' => 'Nueva Esparta'],
            ['name_state' => 'Portuguesa'],
            ['name_state' => 'Sucre'],
            ['name_state' => 'Táchira'],
            ['name_state' => 'Trujillo'],
            ['name_state' => 'Vargas'],
            ['name_state' => 'Yaracuy'],
            ['name_state' => 'Zulia']
        ];

        foreach ($states as $state) {
            States::updateOrCreate($state);
        }
    }
}

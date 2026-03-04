<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Municipalities; // Asegúrate de que el import sea correcto

class MunicipalitySeeder extends Seeder
{
    public function run(): void
    {
        $json = file_get_contents(database_path('seeders/json/DataMunicipio.json'));
        $municipalities = json_decode($json, true);


        foreach ($municipalities as $municipalityData) {
            Municipalities::updateOrCreate(
                [
                    
                    'id_municipality' => $municipalityData['id_municipality'], 
                ],
                [
                    'municipality' => $municipalityData['municipality'],
                    
                    'id_state'          => $municipalityData['id_states'], 
                ]
            );
        }
    }
}
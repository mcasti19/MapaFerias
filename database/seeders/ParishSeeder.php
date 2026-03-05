<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Parishes;

class ParishSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get(database_path('seeders/json/DataParroquia.json'));
        
        $parishes = json_decode($json, true);

        foreach ($parishes as $parish) {
            
            Parishes::updateOrCreate(
                [
                    'parish'  => $parish['parish'],
                    'id_municipality' => $parish['id_municipality']
                ]
            );
    }
}
}

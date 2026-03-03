<?php

namespace Database\Seeders;

use App\Models\Municipality;
use App\Models\States;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class MunicipalitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $json = File::get('database/data/DataMunicipality.json');
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            Municipality::create([
                'id_municipalities' => $obj['id_municipalities'],
                'municipalities' => $obj['municipalities'],
                'id_states' => $obj['id_states']
            ]);
        }
    }
}



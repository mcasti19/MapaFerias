<?php

namespace Database\Seeders;

use App\Models\Parish;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ParishSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $json = File::get('database/data/DataParishs.json');
        $data = json_decode($json, true);
        foreach ($data as $obj) {
            Parish::create([
                'parishes' => $obj['parishes'],
                'id_municipalities' => $obj['id_municipalities']
            ]);
        }
        
    }
}

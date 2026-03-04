<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Items;

class ItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $items = [
            ['item' => 'HUEVOS'],
            ['item' => 'POLLOS'],
            ['item' => 'CARNE'],
            ['item' => 'PERNIL'],
            ['item' => 'PESCADO'],
            ['item' => 'CHARCUTERIA'],
            ['item' => 'FRUVER'],
            ['item' => 'PAN'],
            ['item' => 'CAFE'],
            ['item' => 'RUBROS REGIONALES DE MERCAL'],
            ['item' => 'GRANOS']
            
        ];

        foreach ($items as $item) {
            Items::updateOrCreate($item);
        }
    }
}

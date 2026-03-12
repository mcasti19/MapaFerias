<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Status;
class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $status = [
            ['status' => 'Ejecutado'],
            ['status' => 'Por ejecutar'],
            ['status' => 'No ejecutado'],
            
        ];

        foreach ($status as $status) {
            Status::updateOrCreate($status);
        }
    }
}

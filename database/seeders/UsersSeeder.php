<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;


class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'luis navarro',
            'email' => 'lnavarro@mercal.gob.ve' ,
            'password' => bcrypt('12345678'),   
        ]);
        User::create([
            'name' => 'kleinys prieto',
            'email' => 'kprieto@mercal.gob.ve' ,
            'password' => bcrypt('12345678'),   
        ]);
        User::create([
            'name' => 'moises castillo',
            'email' => 'moicastillo@mercal.gob.ve' ,
            'password' => bcrypt('admin123'),   
        ]);
        User::create([
            'name' => 'danyerbert brito',
            'email' => 'dan@mercal.gob.ve' ,
            'password' => bcrypt('12345678'),   
        ]);
    }
}

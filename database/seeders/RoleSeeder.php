<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'see_map']);
        Permission::create(['name' => 'see_dashboard']);
        Permission::create(['name' => 'see_history']);
        Permission::create(['name'=> 'see_fairs']);
        Permission::create(['name' => 'see_planning']);
        Permission::create(['name' => 'see_compliance']);

        $admin = Role::create(['name' => 'admin']);


        $admin->givePermissionTo(Permission::all());
    }
}

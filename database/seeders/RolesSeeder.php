<?php

namespace Database\Seeders;

use App\Models\Roles;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $inputs = [
            [
                'name' => 'user',
                'role' => 1,
                'created_at' => date('Y-m-d H:i:s'),
            ],

        ];

        Roles::insert($inputs);
    }
}

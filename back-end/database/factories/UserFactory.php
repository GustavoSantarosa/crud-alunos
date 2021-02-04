<?php

namespace Database\Factories;

/** @var \Illuminate\Database\Eloquent\Factories\Factory $factory */;

$factory->define(\App\Models\User::class, function () {
    return [
        "Email"         => 'master@master.com',
        "Nome"          => 'Master',
        "Senha"         => User::encryptPassword('Sampler123'),
    ];
});

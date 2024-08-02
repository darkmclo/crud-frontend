<script setup lang="ts">

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">CRUD</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/">Inicio
                        <span class="visually-hidden">(current)</span>
                    </RouterLink>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Productos</a>
                <div class="dropdown-menu">
                    <RouterLink class="dropdown-item" :to="{ name: 'Productos' }">Listado</RouterLink>
                    <div class="dropdown-divider"></div>
                    <RouterLink class="dropdown-item" :to="{ name: 'Productos.add' }">Añadir</RouterLink>
                </div>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Facturar</a>
                <div class="dropdown-menu">
                    <RouterLink class="dropdown-item" :to="{ name: 'Facturas.add' }">Crear factura</RouterLink>
                    <div class="dropdown-divider"></div>
                    <RouterLink class="dropdown-item" :to="{ name: 'Facturas' }">Listado</RouterLink>
                </div>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Clientes</a>
                <div class="dropdown-menu">
                    <RouterLink class="dropdown-item" :to="{ name: 'Clientes' }">Listado</RouterLink>
                    <div class="dropdown-divider"></div>
                    <RouterLink class="dropdown-item" :to="{ name: 'Clientes.add' }">Añadir</RouterLink>
                </div>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/pkmn">PKMN</RouterLink>
                </li>
            </ul>
            <div class="d-flex">
                <RouterLink to="/login" class="btn btn-warning me-2" type="button">Iniciar sesión</RouterLink>
                <RouterLink to="/register" class="btn btn-secondary me-2" type="button">Registrarse</RouterLink>
            </div>
            </div>
        </div>
    </nav>
</template>

<style>

</style>
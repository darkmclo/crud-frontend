<script setup lang="ts">
//import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <div class="text-center">
      <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
        <header class="masthead mb-auto">
          <div class="inner">
            <h3 class="masthead-brand">Página principal</h3>
          </div>
        </header>

        <main role="main" class="inner cover">
          <h1 class="cover-heading">CRUD.</h1>
          <p class="lead">Para proceder, intente iniciar sesión.</p>
          <p class="lead">
            <RouterLink :to="{ name: 'Inicio de sesión' }" class="btn btn-lg btn-secondary">Log In</RouterLink>
          </p>
        </main>

        <footer class="mastfoot mt-auto">
          <div class="inner">
            <p> © {{ new Date().getFullYear() }}, Christian Alvarado. </p>
          </div>
        </footer>
      </div>
    </div>
  </main>
</template>
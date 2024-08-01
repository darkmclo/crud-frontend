<script setup lang="ts">
//import TheWelcome from '../components/TheWelcome.vue'


</script>

<template>
  <main>
    <div class="container">
      <div class="bs-docs-section mt-4">
        <div class="row">
          <div class="col-lg-12 text-center">
            <div class="page-header">
              <h1 id="forms">Inicio de sesión</h1>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-lg-4">
          </div>
          <div class="col-lg-4">
            <div>
              <form>
                <fieldset>
                  <legend>Utilice sus credenciales</legend>
                  <div>
                    <label for="email" class="form-label mt-4">Correo electrónico</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Escriba su correo electrónico">
                    <small id="emailHelp" class="form-text text-muted">Nunca compartiremos tu correo electrónico con nadie más.</small>
                  </div>
                  <div>
                    <label for="password" class="form-label mt-4">Contraseña</label>
                    <input type="password" class="form-control" id="password" placeholder="Contraseña" autocomplete="off">
                  </div>
                  <div class="mt-4 text-center">
                    <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
          <div class="col-lg-4">
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

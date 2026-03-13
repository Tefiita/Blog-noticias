<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Inicio</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/politica">Política</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/deportivas">Deportivas</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/ciencia-tecnologia">Ciencia y Tecnología</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/crear-noticia">Crear Noticia</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { RouterLink } from 'vue-router';
export default {
  name: 'NavBar',
  components: {
    RouterLink
  }
}
</script>
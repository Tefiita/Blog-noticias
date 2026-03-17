<template>
  <div class="footer py-3 mt-4 border-top border-secondary text-center text-muted small ">
    <div class="container px-4 px-lg-5">
      <div class="row align-items-center justify-content-between">
        <div class="col-md-6 text-md-start mb-3 mb-md-0">
          <p>&copy; 2026 NoticiasApp. Todos los derechos reservados.</p>
        </div>
        <div class="col-md-6 text-md-end mb-3 mb-md-0">
          <a href="#" class="text-decoration-none me-3">Política de Privacidad</a>
          <a href="#" class="text-decoration-none">Términos de Servicio</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};

</script>

<style scoped>
.footer {
  background-color: #2d3748;
}

.footer p {
  color: #fff;
}

.footer a {
  color: #4299e1;
  transition: color 0.2s;
}

.footer a:hover {
  color: #63b3ed;
}
</style>

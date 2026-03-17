<template>
  <header>
    <NavBar />
  </header>
  <main>
    <Noticias />
  </main>

</template>

<script>
import Noticias from '@/components/Noticias.vue';
import NavBar from '../components/NavBar.vue'


export default {
  name: 'NoticiasView',
  components: {
    NavBar,
    Noticias,

  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<template>
  <div>
    <button class="btn btn-light " @click="$router.push(`/noticia/${noticiaId}`)">
      Ver Detalle
    </button>
  </div>
</template>

<script>
export default {
  name: 'BotonNoticia',
  props: {
    noticiaId: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
button {
  border-color: black;

}
</style>
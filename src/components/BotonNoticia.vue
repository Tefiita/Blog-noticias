<template>
  <div>
    <button @click="$router.push(`/noticia/${noticiaId}`)">
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
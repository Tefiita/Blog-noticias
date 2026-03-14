<template>
  <div>
    <div v-if="isLoading" class="loading-container">
      <span class="loading-text">Escribiendo noticias...</span>
    </div>
    <div v-else class="container">
      <div v-for="noticia in noticias" :key="noticia.id" class="mb-3">
        <div class="card mx-auto mt-3 shadow bg-white rounded border-0">
          <div class="card-body p-4 ">
            <h1 class="card-title">{{ noticia.titulo.charAt(0).toUpperCase() +
              noticia.titulo.slice(1) }}</h1>
            <p class="card-text">{{ noticia.resumen }}</p>
            <p class="card-text"><small class="text-muted">Categoría: {{ noticia.categoria.charAt(0).toUpperCase() +
              noticia.categoria.slice(1) }}</small></p>
            <div class="fecha-publicacion">
              {{ noticia.fechaPublicacion ? noticia.fechaPublicacion.toLocaleDateString() : '' }}
            </div>
            <BotonNoticia :noticiaId="noticia.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firestoreConfig';
import BotonNoticia from './BotonNoticia.vue';

export default {
  name: 'Noticias',
  components: {
    BotonNoticia
  },
  data() {
    return {
      noticias: [],
      fechaDate: null,
      isLoading: true
    }
  },

  async mounted() {
    await this.cargarNoticias();
  },
  watch: {
    '$route.params.categoria': {
      immediate: true,
      handler() {
        this.cargarNoticias();
      }
    }
  },
  methods: {
    async cargarNoticias() {
      this.isLoading = true;
      const querySnapshot = await getDocs(collection(db, 'noticias'));
      let noticias = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          fechaPublicacion: data.fechaPublicacion ? data.fechaPublicacion.toDate() : null
        };
      });
      const categoria = this.$route.params.categoria;
      console.log('Ruta:', categoria);
      console.log('Noticias:', noticias.map(n => n.categoria));
      if (categoria) {
        noticias = noticias.filter(n =>
          n.categoria &&
          n.categoria.replace(/\s+/g, '-').toLowerCase() === categoria.toLowerCase()
        );
      }
      this.noticias = noticias;
      this.isLoading = false;
    }
  }

};

</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.loading-text {
  font-size: 1.5em;
  color: #888;
}

.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.card {
  padding: 16px;
}

.card-body {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 150px;
}

.fecha-publicacion {
  margin-top: auto;
  text-align: right;
  color: #888;
  font-size: 0.9em;
}
</style>
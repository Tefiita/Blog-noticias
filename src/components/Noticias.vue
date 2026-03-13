<template>
  <div class="container">
    <div v-for="noticia in noticias" :key="noticia.id" class="mb-3">
      <div class="card mx-auto mt-3 shadow bg-white rounded border-0">
        <div class="card-body p-4 ">
          <h1 class="card-title">{{ noticia.titulo }}</h1>
          <p class="card-text">{{ noticia.resumen }}</p>
          <p class="card-text"><small class="text-muted">{{ noticia.categoria }}</small></p>
          <BotonNoticia />
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
      noticias: []
    }
  },

  async mounted() {
    const querySnapshot = await getDocs(collection(db, 'noticias'));
    this.noticias = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}
</script>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.card {
  padding: 16px;
}
</style>
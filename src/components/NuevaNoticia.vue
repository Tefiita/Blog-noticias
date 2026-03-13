<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class=" card mb-3 mt-3 p-4 rounded bg-white border-0 w-50 mx-auto shadow ">

      <label for="titulo"> Titulo de la Noticia </label>
      <input class="form-control mb-3" v-model="titulo" />

      <label for="resumen">Breve resumen</label>
      <div class="container " rows='10'>
        <textarea class="form-control" :maxlength="caracteresRestantes" v-model="resumen"></textarea>
        <p>{{ caracteresRestantes }}/{{ maxCaracteres }}</p>
      </div>

      <label for="contenido">Contenido</label>
      <div class="container " rows='10'>
        <textarea class="form-control" v-model="contenido"></textarea>
      </div>

      <div class="container mt-3">
        <select class="form-select" v-model="categoria" aria-label="Default select example">
          <option value="" disabled selected>Seleccione Categoría</option>
          <option value="politica">Política</option>
          <option value="deportiva">Deportiva</option>
          <option value="ciencia_tecnologia">Ciencia y Tecnología</option>
        </select>
      </div>

      <button class="btn btn-primary w-50 mx-auto d-block mt-3" @click="publicar">
        Publicar Noticia
      </button>
    </div>
  </div>
</template>

<script>
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firestoreConfig';

export default {
  name: 'NoticiasForm',
  data() {
    return {
      titulo: '',
      resumen: '',
      contenido: '',
      categoria: '',
      maxCaracteres: 1000
    }
  },
  computed: {
    caracteresRestantes() {
      return this.maxCaracteres - this.resumen.length;
    }
  },
  methods: {
    async publicar() {
      try {
        const docRef = await addDoc(collection(db, 'noticias'), {
          titulo: this.titulo,
          resumen: this.resumen,
          contenido: this.contenido,
          categoria: this.categoria,
          fechaPublicacion: new Date()
        });
        console.log('Noticia publicada con ID:', docRef.id);

        this.$router.push('/noticias');
      } catch (error) {
        console.error('Error al publicar la noticia: ', error);
      }
    }
  }
}
</script>
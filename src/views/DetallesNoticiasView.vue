<template>
  <div>
    <NavBar />
    <div v-if="isLoading" class="loading-container">
      <span class="loading-text">Cargando...</span>
    </div>
    <div v-else class="noticia-detalle-container">

      <div class="noticia-detalle-card" v-if="noticia">
        <div class="noticia-detalle-content">
          <div class="noticia-main">
            <h1 class="card-title">{{ noticia.titulo ? noticia.titulo.toUpperCase() : '' }}</h1>
            <p class="card-text">{{ noticia.contenido }}</p>
            <p class="card-text"><small class="text-muted">Categoría: {{ noticia.categoria ?
              noticia.categoria.charAt(0).toUpperCase() + noticia.categoria.slice(1) : '' }}</small></p>
            <div class="fecha-publicacion">
              {{ noticia.fechaPublicacion ? noticia.fechaPublicacion.toLocaleDateString() : '' }}
            </div>
          </div>
          <div class="noticia-resumen">
            <h2>Resumen</h2>
            <p>{{ noticia.resumen }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Sección de opiniones -->
    <div class="opiniones-section">
      <h3>Opiniones sobre la noticia</h3>
      <form @submit.prevent="enviarOpinion" class="opinion-form">
        <input v-model="nuevaOpinion.nombre" type="text" placeholder="Tu nombre" required />
        <textarea v-model="nuevaOpinion.comentario" placeholder="Escribe tu opinión" required></textarea>
        <button type="submit">Enviar opinión</button>
      </form>
      <div v-if="opiniones.length" class="opiniones-list">
        <h4>Comentarios:</h4>
        <ul>
          <li v-for="op in opiniones" :key="op.id">
            <strong>{{ op.nombre }}:</strong> {{ op.comentario }}
          </li>
        </ul>
      </div>
      <div v-else class="opiniones-list">
        <p>No hay opiniones aún.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firestoreConfig';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'DetallesNoticias',
  components: {
    NavBar
  },
  data() {
    return {
      noticia: null,
      isLoading: true,
      opiniones: [],
      nuevaOpinion: {
        nombre: '',
        comentario: ''
      }
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    const docRef = doc(db, 'noticias', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.noticia = docSnap.data();
      this.noticia.id = id;
      if (this.noticia.fechaPublicacion) {
        if (this.noticia.fechaPublicacion.toDate) {
          this.noticia.fechaPublicacion = this.noticia.fechaPublicacion.toDate();
        } else {
          this.noticia.fechaPublicacion = new Date(this.noticia.fechaPublicacion);
        }
      }
    }
    // Cargar opiniones
    await this.cargarOpiniones();
    this.isLoading = false;
  },
  methods: {
    async cargarOpiniones() {
      // Importación dinámica para evitar errores en SSR
      const { collection, getDocs, query, where } = await import('firebase/firestore');
      const opinionesRef = collection(db, 'opiniones');
      const q = query(opinionesRef, where('noticiaId', '==', this.noticia.id));
      const querySnapshot = await getDocs(q);
      this.opiniones = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async enviarOpinion() {
      if (!this.nuevaOpinion.nombre || !this.nuevaOpinion.comentario) return;
      const { addDoc, collection } = await import('firebase/firestore');
      await addDoc(collection(db, 'opiniones'), {
        noticiaId: this.noticia.id,
        nombre: this.nuevaOpinion.nombre,
        comentario: this.nuevaOpinion.comentario,
        fecha: new Date()
      });
      this.nuevaOpinion.nombre = '';
      this.nuevaOpinion.comentario = '';
      await this.cargarOpiniones();
    }
  }
}
</script>
<style scoped>
.opiniones-section {
  margin: 2rem auto 0 auto;
  max-width: 900px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.opinion-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.opinion-form input,
.opinion-form textarea {
  border: 1px solid #e0e3e7;
  border-radius: 6px;
  padding: 0.7rem;
  font-size: 1rem;
}

.opinion-form button {
  align-self: flex-end;
  background: #2d3748;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.opinion-form button:hover {
  background: #4a5568;
}

.opiniones-list {
  margin-top: 1rem;
}

.opiniones-list ul {
  list-style: none;
  padding: 0;
}

.opiniones-list li {
  margin-bottom: 0.7rem;
  background: #f8fafc;
  border-radius: 6px;
  padding: 0.7rem 1rem;
}

body {
  font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  background: #f4f6f8;
}

.noticia-detalle-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
  background: #f4f6f8;
  padding-top: 2rem;
}

.noticia-detalle-card {
  width: 92vw;
  max-width: 1100px;
  background: #fff;
  border: 1px solid #e0e3e7;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 2.5rem 2rem;
}

.noticia-detalle-content {
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
}

.noticia-main {
  flex: 3;
  padding-right: 1.5rem;
}

.noticia-main .card-title {
  font-size: 2.2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid #e0e3e7;
  padding-bottom: 0.7rem;
}

.noticia-main .card-text {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 1.1rem;
}

.noticia-main .text-muted {
  color: #6c757d;
}

.fecha-publicacion {
  font-size: 0.98rem;
  color: #6c757d;
  margin-top: 0.7rem;
}

.noticia-resumen {
  flex: 1;
  background: #f8fafc;
  border: 1px solid #e0e3e7;
  border-radius: 12px;
  padding: 2rem 1.2rem;
  margin-left: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  min-width: 220px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}


.noticia-resumen h2 {
  font-size: 1.25rem;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 0.7rem;
  border-bottom: 1px solid #e0e3e7;
  padding-bottom: 0.3rem;
  width: 100%;
}

.noticia-resumen p {
  font-size: 1.05rem;
  color: #555;
  margin-top: 0.5rem;
}
</style>
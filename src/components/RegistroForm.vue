<template>
  <div class="contenedor card mx-auto mt-5 p-4 rounded bg-white border-0">
    <div class="card mx-auto mt-5 p-4 shadow rounded bg-white border-0 text-center w-50">
      <h2 class="text-center mb-4 fw-bold text-uppercase">Registro Tutor</h2>

      <input class="form-control mb-3" v-model="nombre" placeholder="Nombre completo" />
      <input class="form-control mb-3" v-model="email" type="email" placeholder="Correo" />
      <input class="form-control mb-3" v-model="password" type="password" placeholder="Contraseña" />

      <button class="btn btn-primary w-100" @click="registrar">
        Registrarse
      </button>

      <p class="mt-3 text-center mb-0 text-muted small text-decoration-none text-dark fw-bold">
        <RouterLink to="/">¿Tienes cuenta? Inicia sesión</RouterLink>
      </p>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>
<script>
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { auth } from '../services/firestoreConfig'
import { db } from '../services/firestoreConfig'

export default {
  name: 'RegistroForm',
  data() {
    return {
      nombre: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async registrar() {
      try {
        this.error = null;
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        await setDoc(doc(db, 'usuarios', user.uid), {
          nombre: this.nombre,
          email: this.email,
          createAt: new Date()
        });

        // Redirigir
        setTimeout(() => {
          alert("Registro exitoso. Redirigiendo al login...");
          this.$router.push("/");
        }, 1000);

      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          this.error = 'El correo ya está registrado. Intenta con otro o inicia sesión.';
        } else {
          this.error = 'Error al registrar: ' + error.message;
        }
      }
    }
  }
}
</script>
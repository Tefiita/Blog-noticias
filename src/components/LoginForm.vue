<template>
  <div class="contenedor card mx-auto mt-5 p-4 rounded bg-white border-0">
    <div class="card login-card mx-auto mt-5 p-4 shadow rounded bg-white border-0">
      <form class="login-form w-100 mx-auto p-3" @submit.prevent="login">
        <h2>Iniciar Sesión</h2>
        <div class="form-group mb-3">
          <input class="form-control" type="email" v-model="email" placeholder="Correo Electrónico" required />
        </div>
        <div class="form-group mb-3">
          <input class="form-control" type="password" v-model="password" placeholder="Contraseña" required />
        </div>
        <button type="submit" class="btn btn-primary w-100" @click.prevent="login">Iniciar</button>
        <p class="mt-3 text-center mb-0 text-muted small text-decoration-none text-dark fw-bold">
          <RouterLink to="/registro">¿No tienes una cuenta? Regístrate aquí</RouterLink>
        </p>
        <p v-if="error" class="error text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firestoreConfig'

export default {
  name: 'Login',
  components: {
    RouterLink
  },

  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async login() {
      if (!this.email || !this.password) {
        this.error = 'Por favor, ingresa tu correo electrónico y contraseña.'
        return
      }
      try {
        this.error = null;

        //login con firebase

        const userCredencial = await signInWithEmailAndPassword(auth, this.email, this.password);

        // Si el login es exitoso, redirige a noticias
        this.$router.push('/noticias');

      } catch (error) {
        this.error = 'Error al iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente.'
      }
    }
  }
}
</script>

<style>
.error {
  color: red;
  margin-top: 10px;
}
</style>
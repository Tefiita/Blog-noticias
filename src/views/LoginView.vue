<template>
  <div class="login-container">
    <Login />
  </div>
</template>

<script>
import Login from '../components/LoginForm.vue'
export default {
  name: 'LoginView',
  components: {
    Login
  }
}
</script>
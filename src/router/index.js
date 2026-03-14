import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import NoticiasVuew from '../views/NoticiasVuew.vue'
import RegistroView from '../views/RegistroView.vue'
import CrearNoticia from '../components/CrearNoticia.vue'
import DetallesNoticiasView from '../views/DetallesNoticiasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView,
    },
    {
      path: '/noticias',
      name: 'noticias',
      component: NoticiasVuew,
    },
    {
      path: '/noticias/:categoria',
      name: 'noticias-categoria',
      component: NoticiasVuew,
    },
    {
      path: '/crear-noticia',
      name: 'crear-noticia',
      component: CrearNoticia,
    },
    {
      path: '/noticia/:id',
      name: 'detalle-noticia',
      component: DetallesNoticiasView,
    },
  ],
})

export default router

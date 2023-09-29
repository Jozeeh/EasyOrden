import { createRouter, createWebHistory } from '@ionic/vue-router';
import InicioPage from '../views/InicioPage.vue'
import ComidasPage from '../views/categorias-views/ComidasPage.vue'
import BebidasPage from '../views/categorias-views/BebidasPage.vue'
import PostresPage from '../views/categorias-views/PostresPage.vue'
import OtrosPage from '../views/categorias-views/OtrosPage.vue'
import PagoPage from '../views/pagos-views/PagoPage.vue'
import FacturasPage from '../views/pagos-views/FacturasPage.vue'

const routes = [
  {
    path: '',
    redirect: '/inicio'
  },
  {
    path: '/inicio',
    component: InicioPage
  },
  {
    path: '/comidas',
    component: ComidasPage
  },
  {
    path: '/bebidas',
    component: BebidasPage
  },
  {
    path: '/postres',
    component: PostresPage
  },
  {
    path: '/otros',
    component: OtrosPage
  },
  {
    path: '/pagar',
    component: PagoPage
  },
  {
    path: '/facturas',
    component: FacturasPage
  },
  
  {
    path: '/folder/:id',
    component: () => import ('../views/FolderPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from '@ionic/vue-router';
import GenerarQR from '../views/generador-views/GenerarQRPage.vue'
import InicioPage from '../views/InicioPage.vue'
import PagoPage from '../views/pagos-views/PagoPage.vue'
import FacturasPage from '../views/pagos-views/FacturasPage.vue'
import GestionarProductoPage from '../views/productos-views/GestionarProductoPage.vue'
import PedidosPrepararPage from '../views/productos-views/PedidosPrepararPage.vue'
import ProductosPage from '../views/categorias-views/ProductosPage.vue'
import InicioSesionPage from '../views/usuarios/InicioSesionPage.vue'
import RegistroPage from '../views/usuarios/RegistroPage.vue'
import NotificacionesMeseroPage from '../views/generador-views/NotificacionesMeseroPage.vue'

const routes = [
  {
    path: '',
    redirect: '/inicio-sesion'
  },
  {
    path: '/generador-qr',
    component: GenerarQR
  },
  {
    path: '/notificaciones-mesero',
    component: NotificacionesMeseroPage
  },
  {
    path: '/inicio-sesion',
    component: InicioSesionPage
  },
  {
    path: '/registrarse',
    component: RegistroPage
  },
  {
    path: '/inicio',
    component: InicioPage
  },
  {
    path: '/productos',
    component: ProductosPage
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
    path: '/gestionar-producto',
    component: GestionarProductoPage
  },
  {
    path: '/pedidos-preparar',
    component: PedidosPrepararPage
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

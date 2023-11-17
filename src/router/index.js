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
import GestionarUsuariosPage from '../views/gestionar-users-views/GestionarUsersPage.vue'

import { Storage } from '@ionic/storage';

const routes = [
  {
    path: '',
    redirect: '/inicio-sesion'
  },
  {
    path: '/inicio-sesion',
    component: InicioSesionPage,
    beforeEnter: async (to, from, next) => {
      const acceso = await validarAcceso();
      if (acceso) {
        next('/inicio');
      } else {
        next();
      }
    }
  },
  {
    path: '/registrarse',
    component: RegistroPage,
    beforeEnter: async (to, from, next) => {
      const acceso = await validarAcceso();
      if (acceso) {
        next('/inicio');
      } else {
        next();
      }
    }
  },
  {
    path: '/generador-qr',
    component: GenerarQR,
    beforeEnter: async (to, from, next) => {
      const acceso = await validarAcceso();
      if (acceso) {
        next();
      } else {
        next('/inicio-sesion');
      }
    }
  },
  {
    path: '/notificaciones-mesero',
    component: NotificacionesMeseroPage,
    beforeEnter: async (to, from, next) => {
      const acceso = await validarAcceso();
      if (acceso) {
        next();
      } else {
        next('/inicio-sesion');
      }
    }
  },
  {
    path: '/inicio',
    component: InicioPage,
    beforeEnter: async (to, from, next) => {
      const acceso = await validarAcceso();
      if (acceso) {
        next();
      } else {
        next('/inicio-sesion');
      }
    }
  },
  {
    path: '/productos',
    component: ProductosPage,
    beforeEnter: async (to, from, next) => {
      const acceso = await validarAcceso();
      if (acceso) {
        next();
      } else {
        next('/inicio-sesion');
      }
    }
  },
  {
    path: '/pagar',
    component: PagoPage,
    beforeEnter: async (to, from, next) => {
      const acceso = await validarAcceso();
      if (acceso) {
        next();
      } else {
        next('/inicio-sesion');
      }
    }
  },
  {
    path: '/facturas',
    component: FacturasPage,
    beforeEnter: async (to, from, next) => {
      const acceso = await validarAcceso();
      if (acceso) {
        next();
      } else {
        next('/inicio-sesion');
      }
    }
  },
  {
    path: '/gestionar-producto',
    component: GestionarProductoPage,
    beforeEnter: async (to, from, next) => {
      const acceso = await validarAcceso();
      if (acceso) {
        next();
      } else {
        next('/inicio-sesion');
      }
    }
  },
  {
    path: '/pedidos-preparar',
    component: PedidosPrepararPage,
    beforeEnter: async (to, from, next) => {
      const acceso = await validarAcceso();
      if (acceso) {
        next();
      } else {
        next('/inicio-sesion');
      }
    }
  },
  {
    path: '/gestionar-usuarios',
    component: GestionarUsuariosPage,
    beforeEnter: async (to, from, next) => {
      const acceso = await validarAcceso();
      if (acceso) {
        next();
      } else {
        next('/inicio-sesion');
      }
    }
  }
]

async function validarAcceso() {
  const storage = new Storage();
  await storage.create();
  const usuario = await storage.get('tokenInicioSesion');
  
  return (usuario) ? true : false;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

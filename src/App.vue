<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu side="end" content-id="main-content" type="overlay" :swipe-gesture="false">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Productos</ion-list-header>
            <ion-menu-toggle :auto-hide="false">
              <ion-item router-direction="root" lines="none" :detail="false" class="hydrated" :router-link="('/inicio')">
                <ion-icon aria-hidden="true" slot="start" :ios="home" :md="home"></ion-icon>
                <ion-label>Incio</ion-label>
              </ion-item>
              <ion-item v-if="store.state.datosUsuario.tipoUser == 'Admin'" router-direction="root" lines="none" :detail="false" class="hydrated" :router-link="('/gestionar-producto')">
                <ion-icon aria-hidden="true" slot="start" :ios="addCircle" :md="addCircle"></ion-icon>
                <ion-label>Gestionar producto</ion-label>
              </ion-item>
              <ion-item v-if="(store.state.datosUsuario.tipoUser == 'Admin' || store.state.datosUsuario.tipoUser == 'Empleado')" router-direction="root" lines="none" :detail="false" class="hydrated" :router-link="('/pedidos-preparar')">
                <ion-icon aria-hidden="true" slot="start" :ios="restaurant" :md="restaurant"></ion-icon>
                <ion-label>Pedidos preparar</ion-label>
              </ion-item>
              <ion-item v-if="(store.state.datosUsuario.tipoUser == 'Admin')" router-direction="root" lines="none" :detail="false" class="hydrated" :router-link="('/generador-qr')">
                <ion-icon aria-hidden="true" slot="start" :ios="qrCode" :md="qrCode"></ion-icon>
                <ion-label>Generador QR</ion-label>
              </ion-item>
              <ion-item v-if="(store.state.datosUsuario.tipoUser == 'Admin' || store.state.datosUsuario.tipoUser == 'Empleado')" router-direction="root" lines="none" :detail="false" class="hydrated" :router-link="('/notificaciones-mesero')">
                <ion-icon aria-hidden="true" slot="start" :ios="notifications" :md="notifications"></ion-icon>
                <ion-label>Mesero notificación</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

          <ion-list id="inbox-list">
            <ion-list-header>Cuenta</ion-list-header> <br>
            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="setSelectedIndex(i)" router-direction="root" :router-link="p.url" lines="none"
                :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>

            <!-- CERRAR SESION -->
            <ion-menu-toggle :auto-hide="false">
              <ion-item @click="cerrarSesion">
                <ion-icon aria-hidden="true" slot="start" :icon="logOut"></ion-icon>
                <ion-label>Cerrar Sesión</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>

      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup>
import {
  IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet, IonSplitPane, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonSelect, IonSelectOption, IonFooter, IonThumbnail
} from '@ionic/vue';
import { ref, onMounted, onUpdated } from 'vue';
import {
  home, person, personAdd, settings, document, addCircle, restaurant, logOut, qrCode, notifications
} from 'ionicons/icons';

import store from '@/store';
import router from '@/router';

// Importamos ionic/storage para cerrar sesión
import { Storage } from '@ionic/storage';

// Configuración de ionic/storage
const storage = new Storage();
  storage.create().then(storageInstance => {
});

const tipoUsuario = ref(null);

// Obtenemos datos del storage
async function verTipoUsuario() {
  // Obtenemos el tipo de usuario
  const data = await storage.get('tokenInicioSesion');
  // tipoUsuario.value = data
  tipoUsuario.value = { value: data };

  console.log(tipoUsuario);
}

onMounted(() => {
  // Llamar la función para obtener el usuario actual
  verTipoUsuario();
});

// Cerrar sesión con ionic/storage
const cerrarSesion = async () => {
  await storage.remove('tokenInicioSesion');
  await storage.remove('easyToken');
  store.state.datosUsuario = [];
  tipoUsuario.value = { value: null };
  router.push('/inicio-sesion')
};

const selectedIndex = ref(0);

const appPages = [
  // {
  //   title: 'Ajustes',
  //   url: '/folder/Favorites',
  //   iosIcon: settings,
  //   mdIcon: settings,
  // },
  {
    title: 'Acerca de',
    url: '/folder/Informacion',
    iosIcon: document,
    mdIcon: document,
  },
];

const productosPage = [
  {
    title: 'Inicio',
    url: '/inicio',
    iosIcon: home,
    mdIcon: home,
  },
  {
    title: 'Gestionar producto',
    url: '/gestionar-producto',
    iosIcon: addCircle,
    mdIcon: addCircle,
  },
  {
    title: 'Pedidos a preparar',
    url: '/pedidos-preparar',
    iosIcon: restaurant,
    mdIcon: restaurant,
  },
  {
    title: 'Generar QR',
    url: '/generador-qr',
    iosIcon: qrCode,
    mdIcon: qrCode,
  },
  {
    title: 'Mesero notificaciones',
    url: '/notificaciones-mesero',
    iosIcon: notifications,
    mdIcon: notifications,
  }
];

const path = window.location.pathname.split('folder/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}

const setSelectedIndex = (index) => {
  selectedIndex.value = index;
};

</script>


<style scoped>
ion-menu ion-content {
  /* --background: var(--ion-item-background, var(--ion-background-color, #c93e4f)); */
  --background: none;
  background-color: #c93e4f;
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;

}

ion-list {
  --background: none;
  background-color: #c93e4f;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
  color: #3d1734;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #3d1734);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
  --background: none;
  background-color: #c93e4f;
}

ion-menu.md ion-item.selected {
  --background: #3d1734;
  color: #f5ea95;
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-warning);
}

ion-menu.md ion-item ion-icon {
  color: #3d1734;
}

ion-menu.md ion-item ion-label {
  color: white;
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: rgb(0, 0, 0);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="bgcolor-header">
        <ion-buttons slot="end">
          <ion-menu-button color="light"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding ion-text-center">
      <div id="maintenance-container">
        <img src="https://cdn-icons-png.flaticon.com/128/3594/3594724.png" alt="En Mantenimiento">
        <strong>En Mantenimiento</strong>
        <p>Estamos realizando mejoras en nuestro sitio web.<br>Por favor, vuelve más tarde.</p>
      </div>

      <h2>Estás en {{ $route.params.id }}</h2>
      <p>Explora <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </ion-content>
    
  </ion-page>
</template>

<script setup>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonFooter } from '@ionic/vue';
</script>

<style scoped>
.bgcolor-header {
  --background: #c93e4f;
  --color: white;
}

/* CSS MANTENIMIENTO */
#maintenance-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#maintenance-container img {
  max-width: 150px; /* Ajusta el tamaño de la imagen según tus necesidades */
  margin-bottom: 20px;
}

#maintenance-container strong {
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 10px;
}

#maintenance-container p {
  font-size: 16px;
  line-height: 24px;
  color: #8c8c8c;
  margin: 0;
}

</style>

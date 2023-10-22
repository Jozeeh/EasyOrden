<template>
    <!-- inicio de sesion -->
    <ion-page>
        <ion-content class="fondo-sesion">
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-card class="fondo-card-sesion">
                            <ion-card-header>
                                <img src="/EasyOrden-LogoRojoSinFondo.png">
                                <ion-card-title>Iniciar Sesión</ion-card-title>
                                (para restaurantes)
                            </ion-card-header>
                            <ion-card-content>
                                <ion-item>
                                    <ion-input label-placement="floating" label="Correo" type="email"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input label-placement="floating" label="Contraseña" type="text"></ion-input>
                                </ion-item>

                                <br>
                                <a style="text-decoration: none;" @click="this.$router.push('/registrarse')">¿No tienes cuenta? Registrate aquí</a>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col size="12">
                        <ion-button expand="block" color="success">Iniciar Sesión</ion-button>
                    </ion-col>
                    <ion-col size="12">
                        <ion-button expand="block" color="warning" @click="this.$router.push('/registrarse')">Registrarse</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>

        <ion-footer> 
            <ion-toolbar>
                Desarrollado por DevDreams - 2023
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>


<script>
import {IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonThumbnail, IonFooter, IonToolbar, IonTitle, IonIcon } from '@ionic/vue';
export default {
    name: 'InicioSesionPage',
    components: {
        IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonThumbnail, IonFooter, IonToolbar, IonTitle, IonIcon
    },
    data() {
        return {
        
        };
    }
}
</script>

<style scoped>
.fondo-card-sesion{
    background-color: #ffffff;
    border-radius: 10px;
    text-align: center;
    padding-bottom: 10px;
}
ion-item {
    --ion-item-background: none;
    color: black;
}
ion-card-title {
    color: black;
}
ion-button {
    margin: 0 auto;
    width: 90%;
}
.fondo-sesion {
  --background: none;
  background-image: url('/FondoSesion.jfif');

  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.fondo-sesion::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(14, 14, 14, 0.5);
}
ion-footer{
    --ion-background-color: none;
    background-color: rgb(26, 26, 26);
    --ion-text-color: none;
    color: white;
    text-align: center;
    font-size: 15px;
}
</style>
<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar class="bgcolor-header">
                <ion-buttons slot="start">
                    <ion-back-button text="Atrás"></ion-back-button>
                </ion-buttons>

                <ion-buttons slot="end">
                    <ion-menu-button color="light"></ion-menu-button>
                </ion-buttons>
                <ion-title>Notificaciones de mesero</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="fondo">
            <ion-grid>
                <ion-row>
                    <ion-col size="12" class="ion-text-center">
                        <ion-card style="--background: white;">
                            <img src="/comprar-productos.webp">
                            <ion-card-header>
                                <ion-card-title style="color: black;">Notificaciones mesero</ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <!-- CARGANDO NOTIFICACIONES MESERO -->
                <ion-row v-if="cargandoNotificaciones == true">
                    <ion-col>
                        <ion-card style="background-color: white;">
                            <ion-card-header>
                                <ion-card-title style="color: black;" class="ion-text-center">Cargando notificaciones...</ion-card-title>
                            </ion-card-header>

                            <div
                                style="height: 100%; display: flex; justify-content: center;align-items: center; padding-bottom: 15px;">
                                <ion-spinner name="circular" style="--color: black;"></ion-spinner>
                            </div>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <!-- LISTADO DE NOTIFICACIONES -->
                <ion-row v-if="siHayNotificaciones == true">
                    <ion-col size="6" v-for="(aviso, i) in notificaciones" :key="i">
                        <!-- TARJETAS NOTIFICACIONES -->
                        <ion-card style="background-color: white;" class="card-productos">
                            <ion-card-content class="ion-text-center">
                                <ion-card-title style="--color: black;">{{ aviso.mesa }}</ion-card-title>
                                <ion-card-title style="--color: black;">{{ aviso.estado }}</ion-card-title>
                                <!-- MARCAR MESERO EN CAMINO -->
                                <ion-button color="primary" @click="actualizarNotificacion(aviso.idPedirMesero)">
                                    En camino
                                </ion-button>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <!-- NO HAY NOTIFICACIONES -->
                <ion-row v-if="noHayNotificaciones == true">
                    <ion-col>
                        <ion-card style="background-color: white;">
                            <ion-card-header>
                                <ion-card-title style="color: black;" class="ion-text-center">No hay notificaciones...</ion-card-title>
                                <ion-card-title style="color: black;" class="ion-text-center">Ups...</ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- ACTUALIZANDO ESTADO PEDIR MESERO -->
            <ion-loading :is-open="loadingNotificacion" trigger="open-loading" message="Avisando al cliente que vas en camino!" style="--background: white; color: black;"></ion-loading>
        </ion-content>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonItem, IonFooter, IonModal, IonLabel, IonNote, IonSpinner, IonLoading, IonToast } from '@ionic/vue';

import axios from 'axios';

import { cart, informationCircle, close } from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonItem, IonFooter, IonModal, IonLabel, IonNote, IonSpinner, IonLoading, IonToast
    },
    data() {
        return {
            cart, informationCircle, close,
            ipLocal: this.$store.state.ipLocal,
            noHayNotificaciones: false,
            cargandoNotificaciones: false,
            notificaciones: [],
            loadingNotificacion: false,
            siHayNotificaciones: false
        }
    },
    methods: {
        // Obtenelos las notificaciones del mesero
        obtenerNotificacionesMesero() {
            this.siHayNotificaciones = false;
            this.noHayNotificaciones = false;
            this.cargandoNotificaciones = true;

            axios.get(`${this.ipLocal}/mostrarMesero/Alerta`)
                .then(response => {
                    this.notificaciones = response.data.data;
                    this.cargandoNotificaciones = false;
                    this.siHayNotificaciones = true;
                })
                .catch(error => {
                    this.cargandoNotificaciones = false;
                    this.siHayNotificaciones = false;
                    this.noHayNotificaciones = true;
                    console.log(error);
                })
        },
        // Actualizar estado de notificacion
        actualizarNotificacion(idPedirMesero) {
            this.loadingNotificacion = true
            axios.put(`${this.ipLocal}/pedirmesero/notificar/${idPedirMesero}`, { estado: 'En camino'})
                .then(response => {
                    this.loadingNotificacion = false;
                    this.obtenerNotificacionesMesero();
                })
                .catch(error => {
                    this.loadingNotificacion = false;
                    console.log(error);
                })
        },
        // Obtenemos datos del usuario con Ionic/Storage
        obtenerDatosUsuario() {
            try {
                // Usa la función get para recuperar los datos del usuario por su clave
                this.$storage.get('tokenInicioSesion')
                .then(userData => {
                    if (userData) {
                        // userData contiene los datos del usuario
                        console.log('Datos del usuario:', userData);
                        this.$store.state.datosUsuario = userData;
                    } else {
                        console.log('No se encontraron datos de usuario.');
                    }
                })
                .catch(error => {
                    console.error('Error al recuperar datos del usuario:', error);
                });
            } catch (error) {
                console.error('Error al recuperar datos del usuario:', error);
            }
        }
    },
    beforeCreate(){
        //Verificar si ya tenemos una sesión iniciada
        this.$storage.get('tokenInicioSesion')
            .then(token => {
                if (!token) {
                    //Si no tenemos sesión iniciada
                    console.log('Inicia sesión o registrate!')
                } else {
                    // Si se encuentra un token, obtiene los datos del usuario
                    this.obtenerDatosUsuario();
                    this.obtenerNotificacionesMesero();
                }
            })
            .catch(error => {
                console.error('Error al verificar la sesión:', error);
            });
    },
    created() {
        
    },
    mounted() {

    }
}
</script>


<style scoped>
.fondo {
    --background: none;
    background-image: url('/FondoSesion.webp');

    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.fondo::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(14, 14, 14, 0.5);
}

/* ESTILOS HEADER */
.bgcolor-header {
    --background: #c93e4f;
    --color: white;
}

</style>
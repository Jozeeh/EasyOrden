<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="bgcolor-header">
                <ion-buttons slot="end">
                    <ion-menu-button color="light"></ion-menu-button>
                </ion-buttons>
                <ion-title>EasyOrden - Inicio</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class="contenedor">
                
                <ion-grid>

                    <ion-row>
                        <ion-col>
                            <ion-card>
                                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <ion-card-header>
                                    <ion-card-title>Productos</ion-card-title>
                                </ion-card-header>

                                <ion-card-content>
                                    Puedes comprar comidas aquí.
                                    <br>
                                    <ion-button color="warning" router-link="/productos">Productos</ion-button>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-card>
                                <img alt="mesero" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <ion-card-header>
                                    <ion-card-title>¿Necesitas un mesero?</ion-card-title>
                                    <ion-card-subtitle>AYUDA!</ion-card-subtitle>
                                </ion-card-header>

                                <ion-card-content>
                                    Si necesitas la ayuda de un mesero haz click aquí!
                                    <br>
                                    <ion-button color="tertiary" >Pedir mesero</ion-button>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>

        <ion-footer class="footerPagar">
            <ion-toolbar router-link="/pagar">
                    <b>Productos:</b> {{ this.$store.getters.getCantidadCarrito }}  <b>Total:</b> ${{ this.$store.getters.getTotalCarrito }} <br>
                    <ion-button size="default">
                        <ion-icon aria-hidden="true" slot="start" :ios="cart" :md="cart"></ion-icon>
                        Pagar
                    </ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter } from '@ionic/vue';

import {cart} from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter
    },
    data() {
        return {
            cart
        }
    }
}
</script>


<style scoped>
/* ESTILOS HEADER */
.bgcolor-header {
    --background: #c93e4f;
    --color: white;
}

.contenedor {
    /* border: 1px solid black; */
    width: 90%;
    margin: 0 auto;
}

.footerPagar {
    border-top: 5px solid #fc8e5b;
    padding: 10px;
}

ion-toolbar {
    text-align: center;
}
</style>
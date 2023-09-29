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
                        <ion-col class="ion-text-center">
                            <h2>Productos a preparar</h2>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-card>
                                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <ion-card-header>
                                    <ion-card-title>Card Title</ion-card-title>
                                    <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                                </ion-card-header>

                                <ion-card-content>
                                    Here's a small text description for the card content. Nothing more, nothing less.
                                    <br>
                                    <ion-button color="success">Marcar listo</ion-button>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>

                        <ion-col>
                            <ion-card>
                                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <ion-card-header>
                                    <ion-card-title>Card Title</ion-card-title>
                                    <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                                </ion-card-header>

                                <ion-card-content>
                                    Here's a small text description for the card content. Nothing more, nothing less.
                                    <br>
                                    <ion-button color="success">Marcar listo</ion-button>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>

                        <ion-col>
                            <ion-card>
                                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <ion-card-header>
                                    <ion-card-title>Card Title</ion-card-title>
                                    <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                                </ion-card-header>

                                <ion-card-content>
                                    Here's a small text description for the card content. Nothing more, nothing less.
                                    <br>
                                    <ion-button color="success">Marcar listo</ion-button>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>

                        <ion-col>
                            <ion-card>
                                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <ion-card-header>
                                    <ion-card-title>Card Title</ion-card-title>
                                    <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                                </ion-card-header>

                                <ion-card-content>
                                    Here's a small text description for the card content. Nothing more, nothing less.
                                    <br>
                                    <ion-button color="success">Marcar listo</ion-button>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                
            </div>
        </ion-content>
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


</style>
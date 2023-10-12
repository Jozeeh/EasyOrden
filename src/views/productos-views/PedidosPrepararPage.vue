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
                        <ion-col v-for="(preparar, i) in pedidos" :key="i">
                            <ion-card>
                                <img alt="pedido-imagen" :src="preparar.imagen" />
                                <ion-card-header>
                                    <ion-card-title>{{ preparar.nombrePlato }}</ion-card-title>
                                    <ion-card-title>$ {{ preparar.precio }}</ion-card-title>
                                </ion-card-header>

                                <ion-card-content>
                                    <b>El pedido fue hecho:</b><br>
                                    {{ preparar.created_at }}
                                    <br>

                                    <!-- Si el pedido es recien creado -->
                                    <ion-button v-if="preparar.estadoPedido == 'Ordenado'" color="warning">Marcar en
                                        preparación</ion-button>

                                    <ion-button v-if="preparar.estadoPedido == 'En preparación'" color="primary">Marcar
                                        listo</ion-button>

                                    <ion-button v-if="preparar.estadoPedido == 'Entregado'" color="success"
                                        disabled>ENTREGADO!</ion-button>
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

import { cart } from 'ionicons/icons';

import axios from 'axios';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter
    },
    data() {
        return {
            pedidos: {}
        }
    },
    methods: {
        // Obtenemos los pedidos que se han hecho con los detalles del plato
        obtenerPedidos() {
            axios.get(`http://127.0.0.1:8000/api/pedidos/select`)
                .then(response => {
                    this.pedidos = response.data.data
                    console.log(response.data.data);
                })
                //Si ocurre un error se imprimirá en consola
                .catch(error => {
                    console.error('OCURRIO UN ERROR: ', error);
                })
        }
    },
    mounted() {
        this.obtenerPedidos()
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
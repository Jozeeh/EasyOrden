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
                <ion-title>Factura</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class="contenedor">

                <ion-grid>
                    

                    <ion-row>
                        <ion-col>
                            <ion-grid>
                                <ion-row>
                                    <ion-col size="12">
                                        <ion-card class="detalleFactura">
                                        <ion-card-header>
                                            <ion-card-title>Detalles de la Factura</ion-card-title>
                                        </ion-card-header>
                                        <ion-card-content>
                                            <ion-row>
                                            <ion-col size="6">
                                                <p><strong>Cliente:</strong> Nombre del Cliente</p>
                                                <p><strong>Fecha:</strong> 28 de Septiembre de 2023</p>
                                            </ion-col>
                                            <ion-col size="6">
                                                <p><strong>Número de Factura:</strong> 12345</p>
                                            </ion-col>
                                            </ion-row>
                                        </ion-card-content>
                                        </ion-card>
                                    </ion-col>
                                </ion-row>

                                <ion-row>
                                    <ion-col size="12">
                                        <ion-card class="detalleFactura">
                                        <ion-card-header>
                                            <ion-card-title>Detalles de Producto</ion-card-title>
                                        </ion-card-header>
                                        <ion-card-content>
                                            <ion-row v-for="(producto, i) in this.$store.getters.getCarrito" :key="i">
                                                <ion-col>
                                                    <ion-label>ID:{{ producto.idPlato }} {{ producto.nombrePlato }} ${{ producto.precio }}</ion-label>
                                                </ion-col>
                                            </ion-row>
                                        </ion-card-content>
                                        </ion-card>
                                    </ion-col>
                                </ion-row>

                                <ion-row>
                                    <ion-col size="12">
                                        <ion-card class="detalleFactura">
                                        <ion-card-content>
                                            <ion-row>
                                            <ion-col size="9">
                                                <p class="total-label">Total:</p>
                                            </ion-col>
                                            <ion-col size="3" class="total-amount">
                                                {{this.$store.getters.getTotalCarrito}}
                                            </ion-col>
                                            </ion-row>
                                        </ion-card-content>
                                        </ion-card>
                                    </ion-col>
                                </ion-row>

                                <ion-row>
                                    <ion-col size="12">
                                        <ion-card class="detalleFactura">
                                        <ion-card-content>
                                            <p class="footer">¡Gracias por su compra!</p>
                                        </ion-card-content>
                                        </ion-card>
                                    </ion-col>
                                </ion-row>

                                <ion-row class="ion-text-center">
                        <ion-col>
                                <ion-button color="danger" @click="mandarCocina()">Volver al inicio</ion-button>
                        </ion-col>
                    </ion-row>
                            </ion-grid>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                
            </div>
        </ion-content>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonLabel, IonItem, IonThumbnail, } from '@ionic/vue';

import {cart} from 'ionicons/icons';

import axios from 'axios';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonLabel, IonItem, IonThumbnail,
    },
    data() {
        return {
            cart,
            ipLocal: this.$store.state.ipLocal,
            carrito: {},
            pedido: {},
            idUser: this.$store.state.datosUsuario.id
        }
    },
    methods: {
        mandarCocina(){
            this.pedido = {
                detalles: this.$store.getters.getCarrito.map(producto => ({
                    fkIdPlato: producto.idPlato,
                    fkIdUser: producto.idUsuario,
                    estadoPedido: 'Ordenado',
                    numMesa: 'Mesa 1'
                }))
            };

            axios.post(`http://${this.ipLocal}/api/pedidos/store`, this.pedido)
            .then(response => {
                // this.pedido = {}
                console.log(response.data)
                // this.showToast(true, 'Comida en proceso')
                this.$router.push('/inicio')
                this.$store.dispatch('eliminarCarritoAccion')
            })
            .catch(error => console.error("OCURRIO UN ERROR:", error), console.log(this.pedido))
        }
    },
    mounted() {
        
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

/* ESTILO DE FACTURA */
.detalleFactura {
    border-top: 5px solid #fc8e5b;
}
/* END FACTURA */

</style>
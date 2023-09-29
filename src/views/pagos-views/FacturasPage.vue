<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar class="bgcolor-header">
                <ion-buttons slot="start">
                    <ion-back-button text="Atrás" :icon="caretBack"></ion-back-button>
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
                    <ion-row class="ion-text-center">
                        <ion-col>
                            <ion-button color="danger" router-link="/inicio">Volver al inicio</ion-button>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <div class="invoice">
                                <div class="header">
                                    <h1>Factura de Pago Exitoso</h1>
                                </div>
                                <div class="details">
                                    <div class="left">
                                        <p><strong>Cliente:</strong> Nombre del Cliente</p>
                                        <p><strong>Fecha:</strong> 28 de Septiembre de 2023</p>
                                    </div>
                                    <div class="right">
                                        <p><strong>Número de Factura:</strong> 12345</p>
                                    </div>
                                </div>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Descripción</th>
                                            <th>Cantidad</th>
                                            <th>Precio Unitario</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Producto 1</td>
                                            <td>2</td>
                                            <td>$50.00</td>
                                            <td>$100.00</td>
                                        </tr>
                                        <tr>
                                            <td>Producto 2</td>
                                            <td>1</td>
                                            <td>$75.00</td>
                                            <td>$75.00</td>
                                        </tr>
                                        <tr>
                                            <td>Producto 3</td>
                                            <td>3</td>
                                            <td>$30.00</td>
                                            <td>$90.00</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="3" class="total-label">Total:</td>
                                            <td class="total-amount">$265.00</td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div class="footer">
                                    <p>¡Gracias por su compra!</p>
                                </div>
                            </div>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                
            </div>
        </ion-content>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonLabel, IonItem, IonThumbnail } from '@ionic/vue';

import {cart} from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonLabel, IonItem, IonThumbnail
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

/* ESTILO DE FACTURA */
.invoice {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
    text-align: center;
}

.header h1 {
    font-size: 24px;
    margin: 0;
}

.details {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.left, .right {
    width: 50%;
}

.table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
}

.table th, .table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
}

.total-label {
    text-align: right;
    font-weight: bold;
}

.total-amount {
    font-weight: bold;
}

.footer {
    margin-top: 20px;
    text-align: center;
}
/* END FACTURA */

</style>
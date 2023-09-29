<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="bgcolor-header">
                <ion-buttons slot="end">
                    <ion-menu-button color="light"></ion-menu-button>
                </ion-buttons>
                <ion-title>Gestionar producto</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class="contenedor">
                <div id="add-product-container">
                    <ion-grid>
                    <ion-row>
                        <ion-col size="12" class="ion-text-center">
                            <h1>Gestionar Producto</h1>
                        </ion-col>
                        <ion-col size="12">
                            <ion-button expand="full" color="primary">Buscar producto</ion-button>
                        </ion-col>

                        <ion-col size="12">
                        <ion-item>
                            <ion-label position="stacked">ID</ion-label>
                            <ion-input disabled></ion-input>
                        </ion-item>
                        </ion-col>
                        <ion-col size="12">
                        <ion-item>
                            <ion-label position="stacked">Categoría</ion-label>
                            <ion-select>
                            <!-- Aquí puedes agregar opciones para la categoría -->
                            <ion-select-option value="Comidas">Comidas</ion-select-option>
                            <ion-select-option value="Bebidas">Bebidas</ion-select-option>
                            <ion-select-option value="Postres">Postres</ion-select-option>
                            <ion-select-option value="Otros">Otros</ion-select-option>
                            </ion-select>
                        </ion-item>
                        </ion-col>
                        <ion-col size="12">
                        <ion-item>
                            <ion-label position="stacked">Título</ion-label>
                            <ion-input type="text"></ion-input>
                        </ion-item>
                        </ion-col>
                        <ion-col size="12">
                        <ion-item>
                            <ion-label position="stacked">Descripción</ion-label>
                            <ion-textarea></ion-textarea>
                        </ion-item>
                        </ion-col>
                        <ion-col size="12">
                        <ion-item>
                            <ion-label position="stacked">Precio</ion-label>
                            <ion-input type="number"></ion-input>
                        </ion-item>
                        </ion-col>

                        <ion-col size="12">
                        <ion-item>
                            <ion-label position="stacked">Imagen del Producto</ion-label>
                            <input type="file" accept="image/*">
                        </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-button expand="full" color="success">Agregar</ion-button>
                        </ion-col>
                        <ion-col>
                            <ion-button expand="full" color="warning">Editar</ion-button>
                        </ion-col>
                        <ion-col>
                            <ion-button expand="full" color="danger">Eliminar</ion-button>
                        </ion-col>
                    </ion-row>
                    
                    </ion-grid>
                    
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter, IonItem, IonLabel, IonInput, IonTextarea } from '@ionic/vue';

import {cart} from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter, IonItem, IonLabel, IonInput, IonTextarea
    },
    data() {
        return {
            
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
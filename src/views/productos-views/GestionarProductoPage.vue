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
                            <ion-input label-placement="stacked" label="ID" disabled></ion-input>
                        </ion-item>
                        </ion-col>

                        <ion-col size="12">
                        <ion-item>
                            <ion-select label-placement="stacked" label="Categoria" v-model="plato.categoria">
                            <!-- Aquí puedes agregar opciones para la categoría -->
                            <ion-select-option value="Comidas">Comidas</ion-select-option>
                            <ion-select-option value="Bebidas">Bebidas</ion-select-option>
                            <ion-select-option value="Postres">Postres</ion-select-option>
                            <ion-select-option value="Complementos">Complementos</ion-select-option>
                            </ion-select>
                        </ion-item>
                        </ion-col>

                        <ion-col size="12">
                        <ion-item>
                            <ion-input type="text" label-placement="stacked" label="Titulo" v-model="plato.nombrePlato"></ion-input>
                        </ion-item>
                        </ion-col>

                        <ion-col size="12">
                        <ion-item>
                            <ion-textarea label-placement="stacked" label="Descripcion (No añadido por ahora)"></ion-textarea>
                        </ion-item>
                        </ion-col>

                        <ion-col size="12">
                        <ion-item>
                            <ion-input label-placement="stacked" label="Precio" type="number" v-model="plato.precio"></ion-input>
                        </ion-item>
                        </ion-col>

                        <ion-col size="12">
                        <ion-item>
                            <ion-input label-placement="stacked" label="Imagen del producto" type="file" accept="image/*" @change="handleImageUpload"></ion-input>
                        </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-button expand="full" color="success" @click="agregarProducto">Agregar</ion-button>
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
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter, IonItem, IonLabel, IonInput, IonTextarea} from '@ionic/vue';

import axios from 'axios';

import {cart} from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter, IonItem, IonLabel, IonInput, IonTextarea
    },
    data() {
        return {
            plato: {
                nombrePlato: '',
                categoria: '',
                precio: '',
                imagen: null
                // imagen: 'https://ionicframework.com/docs/img/demos/card-media.png'
            }
            
        }
    },
    methods: {
        handleImageUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
            this.plato.imagen = reader.result; // Guarda la imagen como una cadena base64
            };

            reader.readAsDataURL(file);
        },
        agregarProducto() {
            axios.post(`http://${this.$store.state.ipLocal}/api/platos/store`, this.plato)
            .then(response => {
                console.log(response);
                console.log("Se agrego correctamente: ", response.data);
            })
            .catch(error => {
                console.log(error);
            })
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
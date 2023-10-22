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

        <ion-content padding>
            <ion-grid>
                <ion-row>
                    <ion-col size="12" class="ion-text-center">
                        <h1>Gestionar Producto</h1>
                        <ion-button fill="solid" color="success" @click="modalAgregar = true">
                            <ion-icon slot="start" :icon="addCircleSharp"></ion-icon>
                            Agregar producto
                        </ion-button>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12" class="ion-text-center">
                        <!-- Selecionar categoria -->
                        <ion-list>
                            <ion-item>
                                <ion-select aria-label="Favorite Fruit" value="apple" v-model="categoria"
                                    placeholder="Comidas">
                                    <ion-select-option value="Comidas">Comidas</ion-select-option>
                                    <ion-select-option value="Bebidas">Bebidas</ion-select-option>
                                    <ion-select-option value="Postres">Postres</ion-select-option>
                                    <ion-select-option value="Complementos">Complementos</ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <!-- ION ACORDEON -->
                        <ion-accordion-group v-for="(producto, i) in listPlatos" :key="i">
                            <ion-accordion value="first">
                                <ion-item slot="header" color="light">
                                    <ion-thumbnail slot="start">
                                        <img alt="Silhouette of mountains" :src="producto.imagen" />
                                    </ion-thumbnail>
                                    <ion-label>{{ producto.nombrePlato }}</ion-label>
                                </ion-item>
                                <div class="ion-padding acordionExpand" slot="content">
                                    <ion-buttons slot="end">
                                        <ion-button fill="solid" color="warning" @click="obtenerPlatoEditar(producto.idPlato)">
                                            <ion-icon slot="start" :icon="create"></ion-icon>
                                            Editar
                                        </ion-button>

                                        <ion-button fill="solid" color="danger" @click="eliminarProducto(producto.idPlato)">
                                            <ion-icon slot="start" :icon="trash"></ion-icon>
                                            Eliminar
                                        </ion-button>
                                    </ion-buttons>

                                    <br>
                                    <b>Detalles del producto:</b> <br>
                                    <b>ID:</b> {{ producto.idPlato }} <br>
                                    <b>Nombre:</b> {{ producto.nombrePlato }} <br>
                                    <b>Precio:</b> {{ producto.precio }} <br>
                                    <b>Categoria:</b> {{ producto.categoria }} <br>
                                    <b>Descripción:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                                </div>
                            </ion-accordion>
                        </ion-accordion-group>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- MODAL AGREGAR -->
            <ion-modal :is-open="modalAgregar">
                <ion-header>
                    <ion-toolbar class="bgcolor-header">
                        <ion-title>Editar producto</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="modalAgregar = false">Close</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>

                <ion-content class="ion-padding">
                    <ion-row>
                        <ion-col size="12">
                            <div v-if="plato.imagen != null">
                                <img :src="plato.imagen">
                            </div>
                            <div v-else>
                                <img src="/selecciona-imagen.png">
                            </div>
                        </ion-col>

                        <ion-col size="12">
                            <ion-item>
                                <ion-input type="text" label-placement="stacked" label="Titulo"
                                    v-model="plato.nombrePlato"></ion-input>
                            </ion-item>
                        </ion-col>

                        <ion-col size="12">
                            <ion-item>
                                <ion-select label-placement="stacked" label="Categoria" v-model="plato.categoria"
                                    placeholder="Categorias...">
                                    <ion-select-option value="Comidas">Comidas</ion-select-option>
                                    <ion-select-option value="Bebidas">Bebidas</ion-select-option>
                                    <ion-select-option value="Postres">Postres</ion-select-option>
                                    <ion-select-option value="Complementos">Complementos</ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>

                        <ion-col size="12">
                            <ion-item>
                                <ion-textarea label-placement="stacked" label="Descripcion (No añadido por ahora)"
                                    disabled></ion-textarea>
                            </ion-item>
                        </ion-col>

                        <ion-col size="12">
                            <ion-item>
                                <ion-input label-placement="stacked" label="Precio" type="number"
                                    v-model="plato.precio"></ion-input>
                            </ion-item>
                        </ion-col>

                        <ion-col size="12">
                            <ion-item>
                                <ion-input type="file" accept="image/*" @change="handleImageUpload"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-button expand="full" color="success" @click="agregarProducto">Agregar</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-content>
            </ion-modal>
            <!-- END MODAL AGREGAR -->

            <!-- MODAL EDITAR -->
            <ion-modal :is-open="modalEditar">
                <ion-header>
                    <ion-toolbar class="bgcolor-header">
                        <ion-title>Editar producto</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="modalEditar = false">Close</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>

                <ion-content class="ion-padding">
                    <ion-row>
                        <ion-col size="12">
                            <div v-if="mostrarImagen != null">
                                <img :src="mostrarImagen">
                            </div>
                            <div v-else>
                                <img src="/selecciona-imagen.png">
                            </div>
                        </ion-col>

                        <ion-col size="12">
                            <ion-item>
                                <ion-input type="text" label-placement="stacked" label="ID"
                                    v-model="editarPlato.idPlato" disabled></ion-input>
                            </ion-item>
                        </ion-col>

                        <ion-col size="12">
                            <ion-item>
                                <ion-input type="text" label-placement="stacked" label="Titulo"
                                    v-model="editarPlato.nombrePlato"></ion-input>
                            </ion-item>
                        </ion-col>

                        <ion-col size="12">
                            <ion-item>
                                <ion-select label-placement="stacked" label="Categoria" v-model="editarPlato.categoria"
                                    placeholder="Categorias...">
                                    <ion-select-option value="Comidas">Comidas</ion-select-option>
                                    <ion-select-option value="Bebidas">Bebidas</ion-select-option>
                                    <ion-select-option value="Postres">Postres</ion-select-option>
                                    <ion-select-option value="Complementos">Complementos</ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>

                        <ion-col size="12">
                            <ion-item>
                                <ion-textarea label-placement="stacked" label="Descripcion (No añadido por ahora)"
                                    disabled></ion-textarea>
                            </ion-item>
                        </ion-col>

                        <ion-col size="12">
                            <ion-item>
                                <ion-input label-placement="stacked" label="Precio" type="number"
                                    v-model="editarPlato.precio"></ion-input>
                            </ion-item>
                        </ion-col>

                        <ion-col size="12">
                            <ion-item>
                                <ion-input type="file" accept="image/*" @change="handleImageUpload"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-button expand="full" color="warning" @click="editarPlatoObtenido(editarPlato.idPlato)">Editar</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-content>
            </ion-modal>
            <!-- END MODAL EDITAR -->

        </ion-content>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter, IonItem, IonLabel, IonInput, IonTextarea, IonThumbnail, IonList, IonItemOption, IonItemOptions, IonAccordionGroup, IonAccordion, IonModal } from '@ionic/vue';

import axios from 'axios';

import { eye, create, trash, addCircleSharp } from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {


        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter, IonItem, IonLabel, IonInput, IonTextarea, IonThumbnail, IonList, IonItemOption, IonItemOptions, IonAccordionGroup, IonAccordion, IonModal
    },
    data() {
        return {
            eye, create, trash, addCircleSharp,
            categoria: 'Comidas',
            listPlatos: {},
            plato: {
                nombrePlato: '',
                categoria: 'Comidas',
                precio: '',
                imagen: null
                // imagen: 'https://ionicframework.com/docs/img/demos/card-media.png'
            },
            editarPlato: {
                idPlato: '',
                nombrePlato: '',
                categoria: '',
                precio: '',
                imagen: null
            },
            imagenInputCodificada: null,
            mostrarImagen: "",
            modalAgregar: false,
            modalEditar: false

        }
    },
    methods: {
        obtenerProductos() {
            axios.get(`http://${this.$store.state.ipLocal}/api/platos/select/${this.categoria}`)
                .then(response => {
                    this.listPlatos = response.data.data;
                    console.log(response.data.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                this.plato.imagen = reader.result; // Guarda la imagen como una cadena base64
            };
            reader.onload = () => {
                this.editarPlato.imagen = reader.result; // Guarda la imagen como una cadena base64
            };

            reader.readAsDataURL(file);
        },
        agregarProducto() {
            axios.post(`http://${this.$store.state.ipLocal}/api/platos/store`, this.plato)
                .then(response => {
                    console.log(response);
                    this.modalAgregar = false;
                    this.obtenerProductos();
                })
                .catch(error => {
                    console.log(error);
                })
        },
        obtenerPlatoEditar(idPlato) {
            axios.get(`http://${this.$store.state.ipLocal}/api/platos/find/${idPlato}`)
            .then(response => {
                    this.editarPlato.idPlato = response.data.data.idPlato;
                    this.editarPlato.nombrePlato = response.data.data.nombrePlato;
                    this.editarPlato.precio = response.data.data.precio;
                    this.editarPlato.categoria = response.data.data.categoria;
                    this.mostrarImagen = response.data.data.imagen;
                    // this.editarPlato.imagen = response.data.data.imagen;
                    
                    // this.editarPlato.imagen = btoa(response.data.data.imagen);


                    this.modalEditar = true
                    console.log(response.data.data);
                    console.log("MostrarImagen: " + this.mostrarImagen);
                    // console.log("ImagenCodificada: " + this.editarPlato.imagen);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        editarPlatoObtenido(id) {
            if (this.editarPlato.imagen) {
                axios.put(`http://${this.$store.state.ipLocal}/api/platos/update/${id}`, this.editarPlato)
                    .then(response => {
                        console.log(response);
                        this.modalEditar = false;
                        window.location.reload(); // Recargar la página
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                // Si no hay imagen en editarPlato, crea un nuevo objeto sin la propiedad imagen
                const { imagen, ...datosSinImagen } = this.editarPlato;

                axios.put(`http://${this.$store.state.ipLocal}/api/platos/update/${id}`, datosSinImagen)
                    .then(response => {
                        console.log(response);
                        this.modalEditar = false;
                        window.location.reload(); // Recargar la página
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        eliminarProducto(idPlato) {
            axios.delete(`http://${this.$store.state.ipLocal}/api/platos/delete/${idPlato}`)
                .then(response => {
                    console.log(response)
                    this.obtenerProductos();
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    mounted() {
        this.obtenerProductos();
    },
    watch: {
        categoria(nuevoValor, antiguoValor) {
            if (nuevoValor != antiguoValor) {
                this.obtenerProductos()
            }
        },
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

.acordionExpand {
    /* border: 1px solid black; */
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: #fbfcff;
}

ion-accordion-group {
    margin-top: 10px;
}
</style>
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

        <ion-content class="fondo">
            <ion-grid>
                <ion-row>
                    <ion-col size="12" class="ion-text-center">
                        <ion-card style="--background: white;">
                            <img src="/gestion-productos.webp">
                            <ion-card-header>
                                <ion-card-title style="color: black;">Gestionar Productos</ion-card-title>
                            </ion-card-header>
                            <ion-card-content>
                                <ion-button fill="solid" color="success" @click="modalAgregar = true">
                                    <ion-icon slot="start" :icon="addCircleSharp"></ion-icon>
                                    Agregar producto
                                </ion-button>

                                <br><br>
                                <!-- Selecionar categoria -->
                                <ion-item class="select-categoria">
                                    <ion-select :disabled="botonCategoria" label="Categorias:" v-model="categoria" placeholder="Comidas">
                                        <ion-select-option value="Comidas">Comidas</ion-select-option>
                                        <ion-select-option value="Bebidas">Bebidas</ion-select-option>
                                        <ion-select-option value="Postres">Postres</ion-select-option>
                                        <ion-select-option value="Complementos">Complementos</ion-select-option>
                                    </ion-select>
                                </ion-item>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <ion-row v-if="cargandoProductos == true">
                    <ion-col>
                        <ion-card style="background-color: white;">
                            <ion-card-header>
                                <ion-card-title style="color: black;" class="ion-text-center">Cargando productos...</ion-card-title>
                            </ion-card-header>

                            <div
                                style="height: 100%; display: flex; justify-content: center;align-items: center; padding-bottom: 15px;">
                                <ion-spinner name="circular" style="--color: black;"></ion-spinner>
                            </div>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <ion-row v-else>
                    <ion-col>
                        <ion-card style="--background: none; box-shadow: none;">
                            <ion-card-content>
                                <!-- ION ACORDEON -->
                                <ion-accordion-group v-for="(producto, i) in listPlatos" :key="i">
                                    <ion-accordion value="first" :toggle-icon="caretDownCircle" toggle-icon-slot="end" class="accordion-icon item-description">
                                        <ion-item slot="header" class="item-producto">
                                            <ion-thumbnail slot="start">
                                                <img alt="Silhouette of mountains" :src="producto.imagen" />
                                            </ion-thumbnail>
                                            <ion-label>{{ producto.nombrePlato }}</ion-label>
                                        </ion-item>
                                        <div class="ion-padding acordionExpand" slot="content">
                                            <ion-buttons slot="end">
                                                <ion-button fill="solid" color="warning"
                                                    @click="obtenerPlatoEditar(producto.idPlato)">
                                                    <ion-icon slot="start" :icon="create"></ion-icon>
                                                    Editar
                                                </ion-button>

                                                <ion-button fill="solid" color="danger"
                                                    @click="verAlertaConfirmarEliminar(true, producto.idPlato)">
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
                                            <b>Descripción:</b> Lorem ipsum dolor sit amet adipisicing elit. Quisquam
                                        </div>
                                    </ion-accordion>
                                </ion-accordion-group>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- ALERTA DE CONFIRMACIÓN AL ELIMINAR -->
            <ion-alert style="--background: white; --ion-text-color: black;"
                :is-open="alertaConfirmarEliminar" 
                header="¿Seguro de eliminar este producto?"
                message="No se podrá recuperar una vez eliminado"
                :buttons="botonesAlertaEliminar"
                @didDismiss="verAlertaConfirmarEliminar(false)">
            </ion-alert>

            <!-- CARGANDO ELIMINACION -->
            <ion-loading :is-open="cargandoEliminacion" trigger="open-loading" message="Eliminando producto..." style="--background: white; color: black;"></ion-loading>

            <!-- ALERTA NO PUEDE ELIMINAR -->
            <ion-alert style="--background: white; --ion-text-color: black;"
                :is-open="alertaNoPuedeEliminar" 
                header="Un cliente tiene este producto en su pedido!"
                message="No se puede eliminar"
                :buttons="['OK']">
            </ion-alert>

            <!-- MODAL AGREGAR -->
            <ion-modal :is-open="modalAgregar">
                <ion-header>
                    <ion-toolbar class="bgcolor-header">
                        <ion-title>Editar producto</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="modalAgregar = false">Cerrar</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>

                <ion-content class="ion-padding fondoModal">
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
                            <ion-input type="text" label-placement="stacked" label="Titulo"
                                v-model="plato.nombrePlato"></ion-input>
                        </ion-col>

                        <ion-col size="12">
                            <ion-select class="selectModalStyle" label="Categoria" label-placement="stacked" v-model="plato.categoria"
                                placeholder="Categorias...">
                                <ion-select-option value="Comidas">Comidas</ion-select-option>
                                <ion-select-option value="Bebidas">Bebidas</ion-select-option>
                                <ion-select-option value="Postres">Postres</ion-select-option>
                                <ion-select-option value="Complementos">Complementos</ion-select-option>
                            </ion-select>
                        </ion-col>

                        <!-- <ion-col size="12">
                            <ion-textarea label-placement="stacked" label="Descripcion (No añadido por ahora)"
                                disabled></ion-textarea>
                        </ion-col> -->

                        <ion-col size="12">
                            <ion-input label-placement="stacked" label="Precio" type="number"
                                v-model="plato.precio"></ion-input>
                        </ion-col>

                        <ion-col size="12">
                            <ion-input type="file" accept="image/*" @change="handleImageUpload"></ion-input>
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

            <!-- CARGANDO AGREGAR -->
            <ion-loading :is-open="cargandoAgregacion" trigger="open-loading" message="Agregando producto..." style="--background: white; color: black;"></ion-loading>

            <!-- ALERTA NO PUEDE AGREGAR -->
            <ion-alert style="--background: white; --ion-text-color: black;"
                :is-open="alertaNoPuedeAgregar" 
                header="No se pudo agregar un producto nuevo!"
                message="Asegurate de haber ingresado todos los datos requeridos."
                :buttons="['OK']">
            </ion-alert>

            <!-- MODAL EDITAR -->
            <ion-modal backdropDismiss="false" :is-open="modalEditar">
                <ion-header>
                    <ion-toolbar class="bgcolor-header">
                        <ion-title>Editar producto</ion-title>
                        <ion-buttons slot="end">
                            <ion-button :disabled="btnCerrarEditar" @click="modalEditar = false">Cerrar</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>

                <ion-content v-if="cargandoEditar == true" class="ion-padding fondoModal">
                    <div style="height: 100%; display: flex; justify-content: center;align-items: center; padding-bottom: 15px;">
                        <ion-spinner name="circular" style="--color: black;"></ion-spinner>
                    </div>
                </ion-content>

                <ion-content v-else class="ion-padding fondoModal">
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
                            <ion-input type="text" label-placement="stacked" label="ID" v-model="editarPlato.  idPlato" disabled></ion-input>
                        </ion-col>

                        <ion-col size="12">
                            <ion-input type="text" label-placement="stacked" label="Titulo"
                                v-model="editarPlato.nombrePlato"></ion-input>
                        </ion-col>

                        <ion-col size="12">
                            <ion-select class="selectModalStyle" label-placement="stacked" label="Categoria" v-model="editarPlato.categoria"
                                placeholder="Categorias...">
                                <ion-select-option value="Comidas">Comidas</ion-select-option>
                                <ion-select-option value="Bebidas">Bebidas</ion-select-option>
                                <ion-select-option value="Postres">Postres</ion-select-option>
                                <ion-select-option value="Complementos">Complementos</ion-select-option>
                            </ion-select>
                        </ion-col>

                        <ion-col size="12">
                            <ion-textarea label-placement="stacked" label="Descripcion (No añadido por ahora)"
                                disabled></ion-textarea>
                        </ion-col>

                        <ion-col size="12">
                            <ion-input label-placement="stacked" label="Precio" type="number"
                                v-model="editarPlato.precio"></ion-input>
                        </ion-col>

                        <ion-col size="12">
                            <ion-input type="file" accept="image/*" @change="handleImageUpload"></ion-input>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-button expand="full" color="warning"
                                @click="editarPlatoObtenido(editarPlato.idPlato)">Editar</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-content>
            </ion-modal>
            <!-- END MODAL EDITAR -->

            <!-- CARGANDO EDITACIÓN -->
            <ion-loading :is-open="cargandoEditacion" trigger="open-loading" message="Editando producto..." style="--background: white; color: black;"></ion-loading>

        </ion-content>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter, IonItem, IonLabel, IonInput, IonTextarea, IonThumbnail, IonList, IonItemOption, IonItemOptions, IonAccordionGroup, IonAccordion, IonModal, IonSpinner, IonAlert, IonLoading } from '@ionic/vue';

import axios from 'axios';

import { eye, create, trash, addCircleSharp, caretDownCircle, arrowDownOutline } from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter, IonItem, IonLabel, IonInput, IonTextarea, IonThumbnail, IonList, IonItemOption, IonItemOptions, IonAccordionGroup, IonAccordion, IonModal, IonSpinner, IonAlert, IonLoading
    },
    data() {
        return {
            eye, create, trash, addCircleSharp, caretDownCircle, arrowDownOutline,
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
            modalEditar: false,
            cargandoProductos: false,
            botonCategoria: false,
            cargandoEditar: false,
            cargandoEditacion: false,
            cargandoEliminacion: false,
            cargandoAgregacion: false,
            btnCerrarEditar: false,
            alertaConfirmarEliminar: false,
            alertaNoPuedeEliminar: false,
            idProductoAEliminar: null,
            botonesAlertaEliminar: [{
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                    console.log('Alert canceled');
                }
            },
            {
                text: 'Eliminar',
                role: 'confirm',
                handler: () => {
                    this.eliminarProducto(this.idProductoAEliminar)
                }
            }]
        }
    },
    methods: {
        verAlertaConfirmarEliminar(state, idPlato) {
            this.idProductoAEliminar = idPlato; // Almacena el idPlato
            this.alertaConfirmarEliminar = state;
        },
        obtenerProductos() {
            this.botonCategoria = true
            this.cargandoProductos = true
            axios.get(`http://${this.$store.state.ipLocal}/api/platos/select/${this.categoria}`)
                .then(response => {
                    this.botonCategoria = false
                    this.cargandoProductos = false
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
            this.alertaNoPuedeAgregar = false
            this.cargandoAgregacion = true
            axios.post(`http://${this.$store.state.ipLocal}/api/platos/store`, this.plato)
                .then(response => {
                    console.log(response);
                    this.cargandoAgregacion = false
                    this.modalAgregar = false;
                    this.obtenerProductos();
                })
                .catch(error => {
                    this.cargandoAgregacion = false
                    this.alertaNoPuedeAgregar = true
                    console.log(error);
                })
        },
        obtenerPlatoEditar(idPlato) {
            this.modalEditar = true
            // this.btnCerrarEditar = true
            this.cargandoEditar = true
            axios.get(`http://${this.$store.state.ipLocal}/api/platos/find/${idPlato}`)
                .then(response => {
                    this.editarPlato.idPlato = response.data.data.idPlato;
                    this.editarPlato.nombrePlato = response.data.data.nombrePlato;
                    this.editarPlato.precio = response.data.data.precio;
                    this.editarPlato.categoria = response.data.data.categoria;
                    this.mostrarImagen = response.data.data.imagen;

                    this.btnCerrarEditar = false
                    this.cargandoEditar = false
                    console.log(response.data.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        editarPlatoObtenido(id) {
            this.cargandoEditacion = true
            if (this.editarPlato.imagen) {
                axios.put(`http://${this.$store.state.ipLocal}/api/platos/update/${id}`, this.editarPlato)
                    .then(response => {
                        console.log(response);
                        this.modalEditar = false;
                        this.cargandoEditacion = false;
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
            this.alertaNoPuedeEliminar = false
            this.cargandoEliminacion = true
            axios.delete(`http://${this.$store.state.ipLocal}/api/platos/delete/${idPlato}`)
                .then(response => {
                    this.cargandoEliminacion = false
                    this.obtenerProductos();
                    console.log(response)
                })
                .catch(error => {
                    this.cargandoEliminacion = false
                    this.alertaNoPuedeEliminar = true
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
                    this.$router.push('/inicio-sesion')
                } else {
                    // Si se encuentra un token, obtiene los datos del usuario
                    this.obtenerDatosUsuario();
                }
            })
            .catch(error => {
                console.error('Error al verificar la sesión:', error);
            });
    },
    created() {
        this.obtenerProductos();
    },
    mounted() {
        
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
.item-producto {
    --background: rgb(227, 227, 227);
    --color: black;
    color: black;
}
.item-description {
    background: #fbfcff;
    color: black;
}

.acordionExpand {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: #fbfcff;
    --color: black;
}
.fondoModal{
    --background: white;
}
ion-textarea, ion-input, .selectModalStyle {
    --background: #fbfcff;
    --color: black;
    color: black;
    border-bottom: 1px solid black;
}

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

.select-categoria {
    --background: none;
    background-color: #fefbd6;
    color: black;
    border-radius: 20px;
}

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

ion-accordion-group {
    margin-top: 10px;
}
</style>
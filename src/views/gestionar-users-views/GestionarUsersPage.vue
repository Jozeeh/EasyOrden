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
                                <ion-card-title style="color: black;">Listado usuarios</ion-card-title>
                            </ion-card-header>
                            <ion-card-content>
                                <!-- Selecionar comida -->
                                <ion-item class="select-categoria">
                                    <ion-select :disabled="btnRoles" label="Roles:" v-model="tipoUsuario"
                                        placeholder="Comidas">
                                        <ion-select-option value="Cliente">Cliente</ion-select-option>
                                        <ion-select-option value="Empleado">Empleado</ion-select-option>
                                        <ion-select-option value="Admin">Admin</ion-select-option>
                                    </ion-select>
                                </ion-item>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <!-- CARGANDO LISTADO USUARIOS -->
                <ion-row v-if="cargandoUsuarios == true">
                    <ion-col>
                        <ion-card style="background-color: white;">
                            <ion-card-header>
                                <ion-card-title style="color: black;" class="ion-text-center">Cargando usuarios...</ion-card-title>
                            </ion-card-header>

                            <div
                                style="height: 100%; display: flex; justify-content: center;align-items: center; padding-bottom: 15px;">
                                <ion-spinner name="circular" style="--color: black;"></ion-spinner>
                            </div>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <!-- LISTADO DE USUARIOS -->
                <ion-row v-if="siHayUsuarios == true">
                    <ion-col size="12">
                        <!-- ION ACORDEON -->
                        <ion-accordion-group v-for="(usuario, i) in listUsuarios" :key="i">
                            <ion-accordion value="first" :toggle-icon="caretDownCircle" toggle-icon-slot="end"
                                class="accordion-icon item-description">
                                <ion-item slot="header" class="item-producto">
                                    <ion-label style="color: black;">{{ usuario.name }}</ion-label>
                                </ion-item>
                                <div class="ion-padding accordionExpand" slot="content">
                                    <b>Rol:</b> {{ usuario.tipoUser }} <br>
                                    <ion-button v-if="usuario.tipoUser == 'Empleado'" color="warning" @click="descenderUsuario(usuario.id)">Descender</ion-button>
                                    <ion-button v-if="usuario.tipoUser == 'Cliente'" color="success" @click="ascenderUsuario(usuario.id)">Ascender</ion-button>
                                    <ion-button color="danger" @click="verAlertaConfirmarEliminar(true, usuario.id)">Eliminar</ion-button>
                                </div>
                            </ion-accordion>
                        </ion-accordion-group>
                    </ion-col>
                </ion-row>

                <!-- NO HAY NOTIFICACIONES -->
                <ion-row v-if="noHayUsuarios == true">
                    <ion-col>
                        <ion-card style="background-color: white;">
                            <ion-card-header>
                                <ion-card-title style="color: black;" class="ion-text-center">No hay usuarios...</ion-card-title>
                                <ion-card-title style="color: black;" class="ion-text-center">Ups...</ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- ACTUALIZANDO ESTADO PEDIR MESERO -->
            <ion-loading :is-open="loadingUsuarios" trigger="open-loading" message="Actualizando rol!" style="--background: white; color: black;"></ion-loading>

            <!-- ALERTA DE CONFIRMACIÓN AL ELIMINAR -->
            <ion-alert style="--background: white; --ion-text-color: black;"
                :is-open="alertaConfirmarEliminar" 
                header="¿Seguro de eliminar este producto?"
                message="No se podrá recuperar una vez eliminado"
                :buttons="botonesAlertaEliminar"
                @didDismiss="verAlertaConfirmarEliminar(false)">
            </ion-alert>
        </ion-content>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonItem, IonFooter, IonModal, IonLabel, IonNote, IonSpinner, IonLoading, IonToast, IonAccordion, IonAccordionGroup } from '@ionic/vue';

import axios from 'axios';

import { caretDownCircle } from 'ionicons/icons';

import { cart, informationCircle, close } from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonItem, IonFooter, IonModal, IonLabel, IonNote, IonSpinner, IonLoading, IonToast, IonAccordion, IonAccordionGroup
    },
    data() {
        return {
            cart, informationCircle, close, caretDownCircle,
            ipLocal: this.$store.state.ipLocal,
            noHayUsuarios: false,
            cargandoUsuarios: false,
            listUsuarios: {},
            tipoUsuario: 'Cliente',
            loadingUsuarios: false,
            siHayUsuarios: false,
            btnRoles: false,
            alertaConfirmarEliminar: false,
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
                    this.eliminarUsuario(this.idUsuarioAEliminar)
                }
            }],
            idUsuarioAEliminar: ''
        }
    },
    methods: {
        // Obtener listado de usuarios
        listaUsuarios(){
            this.btnRoles = true;
            this.cargandoUsuarios = true;
            this.noHayUsuarios = false;
            this.siHayUsuarios = false;

            // Petición axios
            axios.get(`${this.ipLocal}/usuarios/select/${this.tipoUsuario}`)
            .then(respuesta => {
                console.log('Respuesta:', respuesta);
                this.btnRoles = false;
                this.cargandoUsuarios = false;
                this.listUsuarios = respuesta.data.data;
                this.siHayUsuarios = true;
            })
            .catch(error => {
                console.error('Error:', error);
                this.btnRoles = false;
                this.cargandoUsuarios = false;
                this.noHayUsuarios = true;
            });
        },

        // Actualizar rol de usuario (Descender)
        descenderUsuario(idUsuario){
            this.loadingUsuarios = true;

            // Petición axios
            axios.put(`${this.ipLocal}/usuarios/update/${idUsuario}`, {
                tipoUser: 'Cliente'
            })
            .then(respuesta => {
                console.log('Respuesta:', respuesta);
                this.loadingUsuarios = false;
                this.listaUsuarios();
            })
            .catch(error => {
                console.error('Error:', error);
                this.loadingUsuarios = false;
            });
        },

        // Actualizar rol de usuario (Ascender)
        ascenderUsuario(idUsuario){
            this.loadingUsuarios = true;

            // Petición axios
            axios.put(`${this.ipLocal}/usuarios/update/${idUsuario}`, {
                tipoUser: 'Empleado'
            })
            .then(respuesta => {
                console.log('Respuesta:', respuesta);
                this.loadingUsuarios = false;
                this.listaUsuarios();
            })
            .catch(error => {
                console.error('Error:', error);
                this.loadingUsuarios = false;
            });
        },

        // Eliminar usuario
        eliminarUsuario(idUsuario){
            this.loadingUsuarios = true;

            // Petición axios
            axios.delete(`${this.ipLocal}/usuarios/delete/${idUsuario}`)
            .then(respuesta => {
                console.log('Respuesta:', respuesta);
                this.loadingUsuarios = false;
                this.listaUsuarios();
            })
            .catch(error => {
                console.error('Error:', error);
                this.loadingUsuarios = false;
            });
        },

        verAlertaConfirmarEliminar(state, idUsuario) {
            this.idUsuarioAEliminar = idUsuario;
            this.alertaConfirmarEliminar = state;
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
                }
            })
            .catch(error => {
                console.error('Error al verificar la sesión:', error);
            });
    },
    created() {
        this.listaUsuarios();
    },
    watch: {
        //este metodo comprueba que la operacion sea diferente para volver hacer el calculo
        //debe ser mismo nombre de la variable donde esta en return
        tipoUsuario(nuevoValor, antiguoValor) {
            if (nuevoValor != antiguoValor) {
                this.listaUsuarios()
            }
        },
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
.select-categoria {
    --background: none;
    background-color: #fefbd6;
    color: black;
    border-radius: 20px;
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
<template>
    <ion-page>
        <ion-content class="fondo-sesion">
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-card class="fondo-card-sesion">
                            <ion-card-header>
                                <img src="/EasyOrden-LogoRojoSinFondo.webp">
                                <ion-card-title>Registrarse</ion-card-title>
                                (para restaurantes)
                            </ion-card-header>

                            <ion-card-content>
                                <ion-item>
                                    <ion-input label-placement="floating" label="Nombre y Apellido" v-model="userData.name" type="text"
                                        required></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input label-placement="floating" label="DUI (solo números sin guión)" v-model="userData.dui" type="number"
                                        required @input="limitarCaracteresDUI"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input label-placement="floating" label="Teléfono" v-model="userData.telefono"
                                        type="number" required></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input label-placement="floating" label="Email" v-model="userData.email"
                                        type="email" required></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input label-placement="floating" label="Contraseña" v-model="userData.password"
                                        type="password" required></ion-input>
                                </ion-item>

                                <br>
                                <a style="text-decoration: none;" @click="this.$router.go(-1)">¿Ya tienes cuenta? Inicia Sesión</a>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col size="12">
                        <ion-button expand="block" color="warning" @click="registrarUsuario">
                            Registrarse
                        </ion-button>
                    </ion-col>
                    <ion-col size="12">
                        <ion-button expand="block" color="success" @click="this.$router.go(-1)">
                            ¿Ya tienes cuenta? Inicia sesión
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ion-alert backdropDismiss="false" style="--background: white; --ion-text-color: black;"
                :is-open="alertaRegistro"
                :header="datosAlertaRegistro.header"
                :message="datosAlertaRegistro.message"
                :buttons="datosAlertaRegistro.buttons"
                @didDismiss="verAlertaRegistro(false)"
            ></ion-alert>
        </ion-content>

        <ion-footer> 
            <ion-toolbar>
                Desarrollado por DevDreams - 2023
            </ion-toolbar>
        </ion-footer>

        <!-- REGISTER MODAL -->
        <ion-modal backdropDismiss="false" ref="modal" :keep-contents-mounted="true" trigger="open-modal" :is-open="modalRegister">
            <ion-header class="ion-text-center" style="background-color: white; color: black; box-shadow: none; padding-top: 10px;">
                <b>Desarrollador por DevDreams - 2023</b>
            </ion-header>

            <div class="modal-container" style="height: 100%; display: flex; justify-content: center;align-items: center; background-color: white;">
                <img src="/EasyOrden-LogoRojoSinFondo.webp" style="padding-left: 15px; padding-right: 15px;">
            </div>

            <ion-footer style="background-color: white; color: black; box-shadow: none;">
                <ion-spinner name="circular" style="--color: black;"></ion-spinner><br>
                Registrando cuenta...<br><br>
            </ion-footer>
        </ion-modal>
    </ion-page>
</template>
  
<script>
import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButtons, IonGrid, IonRow, IonCol, IonCardHeader, IonCardTitle, IonCardContent, IonBackButton, IonFooter, IonModal, IonLabel, IonIcon, IonAlert, IonSpinner } from '@ionic/vue';
import axios from 'axios'

export default {
    name: "RegistroPage",
    components: {
        IonButton, IonCard, IonContent, IonHeader, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButtons, IonGrid, IonRow, IonCol, IonCardHeader, IonCardTitle, IonCardContent, IonBackButton, IonFooter, IonModal, IonLabel, IonIcon, IonAlert, IonSpinner
    },
    data() {
        return {
            ipLocal: this.$store.state.ipLocal,
            //Datos del usuario al momento de registrarse
            userData: {
                name: "",
                dui: "",
                telefono: "",
                email: "",
                password: "",
            },
            //Alerta de registro
            alertaRegistro: false,
            datosAlertaRegistro: {
                header: "",
                message: "",
                buttons: []
            },
            modalRegister: false
        };
    },
    methods: {
        verAlertaRegistro(state, mensajeEstado) {
            if (mensajeEstado === "Registro exitoso!"){
                this.datosAlertaRegistro.header = "Registro Exitoso!";
                this.datosAlertaRegistro.message = "¡Ya puedes iniciar sesión! :)";
                this.datosAlertaRegistro.buttons = [{
                    text: 'OK',
                    role: 'confirm',
                    handler: () => {
                        this.$router.push('/inicio-sesion')
                    },
                }];
                this.alertaRegistro = state;
            } else{
                this.datosAlertaRegistro.header = "Registro Fallido!";
                this.datosAlertaRegistro.message = "¡Al parecer ingresaste mal tus datos! :(";
                this.datosAlertaRegistro.buttons = [{
                    text: 'OK',
                    role: 'confirm',
                    handler: () => {
                        console.log('No se pudo iniciar sesión!')
                    },
                }];
                this.alertaRegistro = state;
            }
        },
        registrarUsuario() {
            this.modalRegister = true
            // Aquí puedes agregar la lógica para registrar al usuario, por ejemplo, enviar los datos a tu servidor.
            // Puedes acceder a los datos del usuario a través de this.userData.
            axios.post(`http://${this.ipLocal}/api/registro/store`, this.userData)
                .then(response => {
                    this.verAlertaRegistro(true, "Registro exitoso!");
                    this.modalRegister = false
                    //Reiniciamos campos al registrar
                    this.userData = { name: "", dui: "", telefono: "", email: "", password: "", }
                    console.log(response)
                })
                .catch(error => {
                    this.verAlertaRegistro(true, "Registro fallido!");
                    this.modalRegister = false
                    console.log(error)
                })
        },
        limitarCaracteresDUI() {
            // Limitar la longitud del valor del campo a 10 caracteres
            if (this.userData.dui.length > 9) {
                this.userData.dui = this.userData.dui.slice(0, 9);
            }
        },
        // Obtenemos datos del usuario con Ionic/Storage
        obtenerDatosUsuario() {
            try {
                // Usa la función get para recuperar los datos del usuario por su clave
                this.$storage.get('tokenInicioSesion')
                    .then(userData => {
                        if (userData) {
                            // userData contiene los datos del usuario
                            this.$store.state.datosUsuario = userData;
                            console.log('Datos del usuario:', userData);
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
    beforeCreate() {
        //Verificar si ya tenemos una sesión iniciada
        this.$storage.get('tokenInicioSesion')
            .then(token => {
                if (!token) {
                    //Si no tenemos sesión iniciada
                    console.log('Inicia sesión o registrate!')
                } else {
                    // Si se encuentra un token, obtiene los datos del usuario y redirige al inicio
                    this.obtenerDatosUsuario();
                    this.$router.push('/inicio');
                }
            })
            .catch(error => {
                console.error('Error al verificar la sesión:', error);
            });
    },
};
</script>
  
<style scoped>
/* ESTILOS HEADER */
.bgcolor-header {
    --background: #c93e4f;
    --color: white;
}

/* Estilos personalizados para darle un aspecto más moderno */
.fondo-card-sesion{
    background-color: #ffffff;
    border-radius: 10px;
    text-align: center;
    padding-bottom: 10px;
}
ion-item {
    --ion-item-background: none;
    color: black;
}
ion-card-title {
    color: black;
}
ion-button {
    margin: 0 auto;
    width: 90%;
}
.fondo-sesion {
  --background: none;
  background-image: url('/FondoSesion.webp');

  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.fondo-sesion::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(14, 14, 14, 0.5);
}
ion-footer{
    --ion-background-color: none;
    background-color: rgb(26, 26, 26);
    --ion-text-color: none;
    color: white;
    text-align: center;
    font-size: 15px;
}
</style>
  
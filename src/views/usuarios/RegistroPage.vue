<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="bgcolor-header">
                <ion-buttons slot="end">
                    <ion-menu-button color="light"></ion-menu-button>
                </ion-buttons>
                <ion-title class="ion-text-center">Registro de usuario</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-card class="ion-padding">
                <ion-list>
                    <ion-item>
                        <ion-input label-placement="floating" label="Nombre" v-model="userData.name" type="text"
                            required></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input label-placement="floating" label="DUI" v-model="userData.dui" type="text" required
                            pattern="\d{8}-\d"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input label-placement="floating" label="Teléfono" v-model="userData.telefono" type="tel"
                            required pattern="\d{4}-\d{4}"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input label-placement="floating" label="Email" v-model="userData.email" type="email"
                            required></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input label-placement="floating" label="Contraseña" v-model="userData.password" type="password"
                            required></ion-input>
                    </ion-item>
                </ion-list>
            </ion-card>
            <ion-button expand="full" class="ion-margin-top" @click="registrarUsuario">
                Registrarse
            </ion-button>
        </ion-content>
    </ion-page>
</template>
  
<script>
import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButtons } from '@ionic/vue';
import axios from 'axios'

export default {
    name: "RegistroPage",
    components: {
        IonButton, IonCard, IonContent, IonHeader, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButtons
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
            }
        };
    },
    methods: {
        registrarUsuario() {
            // Aquí puedes agregar la lógica para registrar al usuario, por ejemplo, enviar los datos a tu servidor.
            // Puedes acceder a los datos del usuario a través de this.userData.
            axios.post(`http://${this.ipLocal}/api/registro/store`, this.userData)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
};
</script>
  
<style scoped>
/* ESTILOS HEADER */
.bgcolor-header {
    --background: #c93e4f;
    --color: white;
}

/* Estilos personalizados para darle un aspecto más moderno */
ion-card {
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

ion-button {
    background-color: #0072b3;
    color: #fff;
    border-radius: 10px;
}
</style>
  
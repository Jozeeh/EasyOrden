<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="bgcolor-header">
                <ion-buttons slot="end">
                    <ion-menu-button color="light"></ion-menu-button>
                </ion-buttons>
                <ion-title>Generador QR</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="fondo">
            <ion-grid>
                <ion-row>
                    <ion-col class="ion-text-center">
                        <ion-card style="--background: white;">
                            <img src="/generador-qr.webp">
                            <ion-card-header>
                                <ion-card-title style="color: black;">Generar QR de mesa</ion-card-title>
                            </ion-card-header>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <ion-card class="card-qr">
                            <ion-card-content>
                                <ion-item>
                                    <ion-input label-placement="floating" label="Restaurante" v-model="text1"></ion-input>
                                </ion-item>

                                <ion-item>
                                    <ion-select class="selectModalStyle" label="Mesa" label-placement="floating" v-model="text2" placeholder="Categorias...">
                                        <ion-select-option value="Mesa 1">Mesa 1</ion-select-option>
                                        <ion-select-option value="Mesa 2">Mesa 2</ion-select-option>
                                        <ion-select-option value="Mesa 3">Mesa 3</ion-select-option>
                                        <ion-select-option value="Mesa 4">Mesa 4</ion-select-option>
                                    </ion-select>
                                    <!-- <ion-input label-placement="floating" label="Mesa" v-model="text2"></ion-input> -->
                                </ion-item>
                                <br>
                                <ion-button @click="generateQRCode">Generar codigo QR</ion-button>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <ion-card class="card-qr">
                            <ion-card-content>
                                <ion-img style="margin: 0 auto;" :src="qrCodeUrl" v-if="qrCodeUrl" alt="QR Code"></ion-img>

                                <!-- Agregar un enlace de descarga --> <br>
                                <a :href="qrCodeUrl" download="codigo-qr.png" v-if="qrCodeUrl">
                                    <ion-button>Descargar Imagen</ion-button>
                                </a>
                                <ion-button @click="descargarPDF" v-if="qrCodeUrl">Descargar PDF</ion-button>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>

        </ion-content>
    </ion-page>
</template>
  
<script>
import { IonPage, IonHeader, IonContent, IonToolbar, IonTitle, IonInput, IonLabel, IonItem, IonImg, IonButton, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelect, IonSelectOption } from '@ionic/vue';
import QRCode from 'qrcode-generator';
import jsPDF from 'jspdf';

export default {
    components: {
        IonPage, IonHeader, IonContent, IonToolbar, IonTitle, IonInput, IonLabel, IonItem, IonImg, IonButton, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelect, IonSelectOption
    },
    data() {
        return {
            text1: '',
            text2: '',
            qrCodeUrl: null,
            ipLocal: this.$store.state.ipLocal,
        };
    },
    methods: {
        generateQRCode() {
            // Combine the two texts into one string
            const combinedText = `${this.text1}, ${this.text2}`

            // Create a QRCode instance and generate the QR code
            const qrcode = new QRCode(0, 'M');
            qrcode.addData(combinedText);
            qrcode.make();

            // Convert the QR code data to a data URL
            this.qrCodeUrl = qrcode.createDataURL(4, 0);
        },
        descargarPDF() {
            if (!this.qrCodeUrl) {
                return;
            }

            // Crear una nueva instancia de jsPDF
            const pdf = new jsPDF();

            // Agregar la imagen QR al PDF
            pdf.addImage(this.qrCodeUrl, 'PNG', 10, 10, 90, 90);

            // Guardar el PDF con un nombre de archivo
            pdf.save('codigo-qr.pdf');
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
    }
};
</script>

<style>
.card-qr {
    background-color: #ffffff;
    border-radius: 10px;
    text-align: center;
    padding-bottom: 10px;
}

ion-item {
    --ion-item-background: none;
    color: black;
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

/* ESTILOS HEADER */
.bgcolor-header {
    --background: #c93e4f;
    --color: white;
}
ion-img {
    width: 150px;
}
</style>
  
<template>
  <Page>
    <ActionBar title="Nueva Bolsa">
      <NavigationButton android.systemIcon="ic_menu_back" @tap="barBack" />
    </ActionBar>
    <StackLayout>
      <StackLayout orientation="horizontal">
        <BarcodeScanner
          row="0"
          height="300"
          formats="QR_CODE, EAN_13, UPC_A"
          beepOnScan="true"
          reportDuplicates="true"
          preferFrontCamera="false"
          @scanResult="onScanResult"
          v-if="isIOS"
        />
        <Button class="scan" text="Código" width="140" @tap="doScanWithBackCameraWithFlip" />
        <label
          class="code"
          :text="getCode"
          width="200"
          verticalAlignment="center"
          horizontalAlignment="center"
        />
        <Button class="auto" text="auto" width="40" @tap="autocode" />
      </StackLayout>
      <ScrollView height="600">
        <GridLayout rows="auto, auto, auto, auto, auto, *">
          <StackLayout row="0">
            <Button text="Remitente" @tap="remitente" v-if="!getRemitente.name" />
            <customers-item :item="getRemitente" title="Remitente" v-if="getRemitente.name"></customers-item>
          </StackLayout>

          <StackLayout row="1">
            <Button text="Destinatario" @tap="destinatario" v-if="!getDestinatario.name" />
            <customers-item
              :item="getDestinatario"
              title="Destinatario"
              v-if="getDestinatario.name"
            ></customers-item>
          </StackLayout>

          <StackLayout row="2"></StackLayout>

          <StackLayout row="3">
            <Button
              text="Descripción o Detalle"
              @tap="showDescription = showDescription ? false : true"
            />
            <label text="Descripción o Detalles" class="descripcion" v-if="showDescription" />
            <TextView v-model="detalles" v-if="showDescription" />
          </StackLayout>

          <!-- <StackLayout row="4">
            <Button text="Tomar Fotografia" @tap="takePicture" />
            <Image :src="getImage" widuth="75" height="75" />
          </StackLayout>-->

          <StackLayout row="5">
            <Button text="Crear Envio" class="btn-primary" @tap="SubmitPackage" v-if="getCode" />
          </StackLayout>
        </GridLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import Home from "../Home.vue";
import TypeItem from "./items/TypeItem.vue";
import SearchClient from "../Customers/SearchClient.vue";
import CustomersItem from "./items/CustomersItem.vue";
import { BarcodeScanner } from "nativescript-barcodescanner";
import axios from "axios/dist/axios";
import Exit from "./modals/Exit.vue";
const camera = require("@nativescript/camera");
var geolocation = require("nativescript-geolocation");
import { Accuracy } from "tns-core-modules/ui/enums";
import server from "../../env.dev";

export default {
  name: "NewBags",
  data() {
    return {
      isIOS: "",
      showDescription: false,
      detalles: "",
      image: "",
      latitude: "",
      longitude: ""
    };
  },
  components: {
    CustomersItem,
    TypeItem
  },
  mounted() {
    geolocation.enableLocationRequest().then(() => {
      this.getGeolocation();
    });
  },
  computed: {
    getCode() {
      return this.$store.getters.getCode;
    },
    getRemitente() {
      return this.$store.getters.getRemitente;
    },
    getDestinatario() {
      return this.$store.getters.getDestinatario;
    },
    getTipo() {
      return this.$store.getters.getTipo;
    },
    getImage() {
      return this.$store.getters.getImage;
    },
    getCoordenates() {
      return this.$store.getters.getCoordenates;
    },
    getCredentials() {
      return this.$store.getters.getAccessToken;
    }
  },
  methods: {
    getGeolocation() {
      setInterval(() => {
        geolocation
          .getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            maximumAge: 5000,
            timeout: 20000
          })
          .then(res => {
            let that = this;
            this.latitude = res.latitude;
            this.longitude = res.longitude;
          });
      }, 2000);
    },
    exitModal() {
      this.$showModal(Exit).then(res => {
        if (res === "continuar") {
          this.clear();
        } else {
          this.clear();
          this.barBack();
        }
      });
    },
    clear() {
      this.$store.commit("UNSET_CODE");
      this.$store.commit("UNSET_REMITENTE");
      this.$store.commit("UNSET_DESTINATARIO");
      this.detalles = "";
    },

    SubmitPackage() {
      let data = {
        code: this.getCode,
        state_id: 3,
        latitude: this.latitude,
        longitude: this.longitude,
        sender_id: this.getRemitente.id,
        reciver_id: this.getDestinatario.id,
        description: this.detalles
      };

      axios
        .post(server + "bolsas", data, {
          headers: {
            Accept: "application/json",
            Authorization: this.getCredentials
          }
        })
        .then(res => {
          console.log(res.data);
          this.exitModal();
        })
        .catch(err => {
          console.log(err.response);
          //this.exitModal();
          alert(
            "No has llenado todos los campos o hay un error en la operación"
          );
        });
    },

    onScanResult(evt) {
      console.log(`onScanResult: ${evt.text} (${evt.format})`);
    },
    doScanWithBackCameraWithFlip() {
      this.scan(false, true);
    },
    scan(preferFrontCamera, showFlipCameraButton) {
      new BarcodeScanner()
        .scan({
          cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
          cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
          message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
          preferFrontCamera, // Android only, default false
          showFlipCameraButton, // default false
          showTorchButton: true, // iOS only, default false
          torchOn: false, // launch with the flashlight on (default false)
          resultDisplayDuration: 500, // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
          beepOnScan: true, // Play or Suppress beep on scan (default true)
          openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
          closeCallback: () => {
            console.log("Scanner closed @ " + new Date().getTime());
          }
        })
        .then(result => {
          let that = this;
          // Cambiar accion por la necesaria
          console.log(result.text);
          that.$store.commit("SET_CODE", result.text);
        })
        .catch(err => {
          alert("No Code in database");
          console.log("No scan. " + err);
        });
    },
    sendCode() {
      this.$store.dispatch("SEARCH_BAG_CODE", 439224452);
    },
    autocode() {
      let code = Math.floor(Math.random() * 999999999) + 111111111;
      this.$store.commit("SET_CODE", code);
    },
    takePicture() {
      camera
        .requestPermissions()
        .then(() => {
          camera
            .takePicture({
              width: 600,
              height: 600,
              keepAspectRatio: true,
              saveToGallery: true
            })
            .then(imageAsset => {
              this.image = imageAsset;
              this.$store.commit("SET_IMAGE", imageAsset);
            })
            .catch(e => {
              console.log("error:", e);
            });
        })
        .catch(e => {
          console.log("Error requesting permission");
        });
    },
    remitente() {
      this.$navigateTo(SearchClient, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        },
        props: {
          tipo: "sender",
          fuente: "bolsas"
        }
      });
    },

    destinatario() {
      this.$navigateTo(SearchClient, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        },
        props: {
          tipo: "reciver",
          fuente: "bolsas"
        }
      });
    },

    barBack() {
      this.$navigateTo(Home, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        }
      });
    }
  }
};
</script>

<style scoped>
.scan {
  margin: 0 auto;
  background-color: darkslategray;
  color: white;
  height: 48;
}

.code {
  text-align: center;
  font-weight: 900;
  font-size: 14;
  background-color: gray;
  height: 35;
  margin: 0 !important;
  padding-top: 6;
  color: white;
}

.auto {
  margin: 0 auto;
  background-color: darkcyan;
  color: white;
  height: 48;
}

.descripcion {
  text-align: center;
}
</style>
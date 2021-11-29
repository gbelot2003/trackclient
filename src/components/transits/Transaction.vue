<template>
  <Page>
    <ActionBar title="Nuevo Transito de Paquete">
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
        <Button class="scan" text="Scan Código" width="140" @tap="doScanWithBackCameraWithFlip" />
        <label
          class="code"
          :text="getPackage.code"
          width="200"
          verticalAlignment="center"
          horizontalAlignment="center"
        />
        <Button class="auto" text="manu" width="50" @tap="manualCode" />
      </StackLayout>

      <GridLayout rows="auto, auto" columns="*,*">
        <customers-item row="0" column="0" :item="getSender" title="Emisor" v-if="getPackage.code" />
        <customers-item
          row="0"
          column="1"
          :item="getReciver"
          title="Destinatario"
          v-if="getPackage.code"
        />
      </GridLayout>
      <StackLayout>
        <Button text="Transitos Normales" @tap="bregulares" v-if="regulares" />.
        <Button text="Transitos Finales" @tap="bfinales" v-if="finales" />
      </StackLayout>
      <StackLayout>
        <transito-item :item="getTransito" v-if="getTransito" v-on:choice="showChoices" />
      </StackLayout>
      <StackLayout>
        <TextView v-if="getTransito" class="form" hint="Detalles" v-model="details" />
        <Button v-if="getTransito" text="Registras" class="btn-primary" @tap="SubmitPackage" />
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
import Home from "../Home.vue";
import { BarcodeScanner } from "nativescript-barcodescanner";
import CustomersItem from "./items/CustomersItem.vue";
const camera = require("@nativescript/camera");
var geolocation = require("nativescript-geolocation");
import { Accuracy } from "tns-core-modules/ui/enums";
const dialogs = require("tns-core-modules/ui/dialogs");
import { ValueList } from "nativescript-drop-down";
import RegularVue from "./transits/Regular.vue";
import FinalesVue from "./transits/Finales.vue";
import TransitoItem from "./transits/TransitoItem.vue";
import Exit from "./modals/Exit.vue";
import axios from "axios/dist/axios";
import server from "../../env.dev";

export default {
  name: "Transaction",
  components: {
    CustomersItem,
    TransitoItem
  },
  data() {
    return {
      isIOS: "",
      regulares: false,
      finales: false,
      details: "",
      latitude: "",
      longitude: ""
    };
  },
  mounted() {
    this.$store.commit("UNSET_PACKAGE");
    geolocation.enableLocationRequest().then(() => {
      this.getGeolocation();
    });
  },
  methods: {
    SubmitPackage() {
      let data = {
        packages_id: this.getPackage.id,
        longitude: this.longitude,
        latitude: this.latitude,
        state_id: this.getTransito.id,
        details: this.details
      };

      console.log(data);

      axios
        .post(server + "transitos", data, {
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
          console.log(err);
          //this.exitModal();
          alert(
            "No has llenado todos los campos o hay un error en la operación"
          );
        });
    },
    manualCode() {
      prompt({
        title: "Ingrese el numero de Código",
        message: "Agrega el Numero de código manual",
        okButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        inputType: dialogs.inputType.number
      })
        .then(res => {
          console.log(res);
          this.$store
            .dispatch("SEARCH_CODE", res.text)
            .then(resp => {
              if (Object.keys(resp).length === 0) {
                console.log("empty -----------------");
                alert("No se encontro el código en la base de datos");
              } else {
                this.regulares = true;
                this.finales = true;
              }
            })
            .catch(err => {
              console.log(err.response);
            });
        })
        .catch(e => {
          console.log(e);
        });
    },
    bregulares() {
      this.$showModal(RegularVue, { fullscreen: true }).then(res => {
        if (res !== "close") {
          this.regulares = false;
          this.finales = false;
        }
      });
    },
    bfinales() {
      this.$showModal(FinalesVue, { fullscreen: true }).then(res => {
        if (res !== "close") {
          this.regulares = false;
          this.finales = false;
        }
      });
    },
    showChoices() {
      this.regulares = true;
      this.finales = true;
      this.$store.commit("UNSET_TRANSITO");
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
          // Cambiar accion por la necesaria

          this.$store
            .dispatch("SEARCH_CODE", result.text)
            .then(resp => {
              if (Object.keys(resp).length === 0) {
                alert("No se encontro el código en la base de datos");
              } else {
                this.regulares = true;
                this.finales = true;
              }
            })
            .catch(err => {
              console.log(err.response);
            });
        })
        .catch(err => {
          alert("No Code in database");
          console.log("No scan. " + err);
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
    },
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
      this.$store.commit("UNSET_PACKAGE");
      this.$store.commit("UNSET_CODE");
      this.$store.commit("UNSET_TRANSITO");
      this.detalles = "";
      this.latitude = "";
      this.longitude = "";
    }
  },
  computed: {
    getPackage() {
      return this.$store.getters.getPackage;
    },
    getCode() {
      return this.$store.getters.getPackage.code;
    },
    getSender() {
      return this.$store.getters.getPackage.sender;
    },
    getReciver() {
      return this.$store.getters.getPackage.reciver;
    },
    getTransito() {
      return this.$store.getters.getTransito;
    },
    getCredentials() {
      return this.$store.getters.getAccessToken;
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
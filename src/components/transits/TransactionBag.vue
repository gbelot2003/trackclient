<template>
  <Page>
    <ActionBar title="Nuevo Transito de Bolsas">
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
        <Button
          class="scan"
          text="Scan Código"
          width="140"
          @tap="doScanWithBackCameraWithFlip"
        />
        <label
          class="code"
          text
          width="200"
          verticalAlignment="center"
          horizontalAlignment="center"
        />
        <Button class="auto" text="manu" width="50" @tap="manualCode" />
      </StackLayout>
      <!-- <GridLayout rows="auto, auto" columns="*,*">
        <customers-item row="0" column="0" :item="getSender" title="Emisor" v-if="getBag.code" />
        <customers-item
          row="0"
          column="1"
          :item="getReciver"
          title="Destinatario"
          v-if="getBag.code"
        />
      </GridLayout> -->
      <ScrollView height="200">
        <ListView height="200" for="item in items">
          <v-template>
            <StackLayout>
              <Label :text="item.code" />
            </StackLayout>
          </v-template>
        </ListView>
      </ScrollView>
      <StackLayout>
        <Button text="Transitos Normales" @tap="bregulares" v-if="regulares" />.
        <Button text="Transitos Finales" @tap="bfinales" v-if="finales" />
      </StackLayout>
      <StackLayout>
        <transito-item
          :item="getTransito"
          v-if="getTransito"
          v-on:choice="showChoices"
        />
      </StackLayout>
      <StackLayout>
        <TextView
          v-if="getTransito"
          class="form"
          hint="Detalles"
          v-model="details"
        />
        <Button
          v-if="getTransito"
          text="Registras"
          class="btn-primary"
          @tap="SubmitPackage"
        />
        <Button v-if="getTransito" text="Cancelar" @tap="clear" />
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
import Home from "../Home.vue";
import { BarcodeScanner } from "nativescript-barcodescanner";
import TransitoItem from "./transits/TransitoItem.vue";
import CustomersItem from "./items/CustomersBagItem.vue";
import RegularVue from "./transits/Regular.vue";
import FinalesVue from "./transits/Finales.vue";
var geolocation = require("nativescript-geolocation");
import { Accuracy } from "tns-core-modules/ui/enums";
const dialogs = require("tns-core-modules/ui/dialogs");
import Exit from "./modals/Exit.vue";
import axios from "axios/dist/axios";
import server from "../../env.dev";

export default {
  name: "TransactionBag",
  data() {
    return {
      isIOS: "",
      regulares: false,
      finales: false,
      latitude: "",
      longitude: "",
      items: [],
    };
  },
  mounted() {
    geolocation.enableLocationRequest().then(() => {
      this.getGeolocation();
    });
  },
  components: {
    CustomersItem,
    TransitoItem,
  },
  computed: {
    getBag() {
      return this.$store.getters.getBag;
    },
    getCode() {
      return this.$store.getters.getBag.code;
    },
    getSender() {
      return this.$store.getters.getBag.sender;
    },
    getReciver() {
      return this.$store.getters.getBag.reciver;
    },
    getTransito() {
      return this.$store.getters.getTransito;
    },
    getCredentials() {
      return this.$store.getters.getAccessToken;
    },
  },

  methods: {
    SubmitPackage() {
      let data = {
        codes: this.items,
        bag_id: this.getBag.id,
        longitude: this.longitude,
        latitude: this.latitude,
        state_id: this.getTransito.id,
        details: this.details,
      };

      console.log(data);

      axios
        .post(server + "transitos-bolsas", data, {
          headers: {
            Accept: "application/json",
            Authorization: this.getCredentials,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.exitModal();
        })
        .catch((err) => {
          console.log(err);
          //this.exitModal();
          alert(
            "No has llenado todos los campos o hay un error en la operación"
          );
        });
    },
    bregulares() {
      this.$showModal(RegularVue, { fullscreen: true }).then((res) => {
        if (res !== "close") {
          this.regulares = false;
          this.finales = false;
        }
      });
    },
    bfinales() {
      this.$showModal(FinalesVue, { fullscreen: true }).then((res) => {
        if (res !== "close") {
          this.regulares = false;
          this.finales = false;
        }
      });
    },
    manualCode() {
      prompt({
        title: "Ingrese el numero de Código",
        message: "Agrega el Numero de código manual",
        okButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        inputType: dialogs.inputType.number,
      })
        .then((res) => {
          this.$store.dispatch("SEARCH_BAG_CODE", res.text).then((resp) => {
            if (Object.keys(resp).length === 0) {
              alert("No se encontro el código en la base de datos");
            } else {
              if (
                resp.transaction.state_id === 8 ||
                resp.transaction.state_id === 9 ||
                resp.transaction.state_id === 11 ||
                resp.transaction.state_id === 12 ||
                resp.transaction.state_id === 13
              ) {
                alert("El numero de paquete aparece cerrado");
                return;
              }

              this.items.push({ id: resp.id, code: resp.code });
              this.regulares = true;
              this.finales = true;
            }
          });
        })
        .catch((e) => {
          console.log(e);
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
          },
        })
        .then((result) => {
          // Cambiar accion por la necesaria
          this.$store.dispatch("SEARCH_BAG_CODE", result.text).then((resp) => {
            if (Object.keys(resp).length === 0) {
              alert("No se encontro el código en la base de datos");
            } else {
              if (
                resp.transaction.state_id === 8 ||
                resp.transaction.state_id === 9 ||
                resp.transaction.state_id === 11 ||
                resp.transaction.state_id === 12 ||
                resp.transaction.state_id === 13
              ) {
                alert("El numero de paquete aparece cerrado");
                return;
              }
              this.items.push({ id: resp.id, code: resp.code });
              this.regulares = true;
              this.finales = true;
            }
          });
        })
        .catch((err) => {
          alert("No Code in database");
          console.log("No scan. " + err);
        });
    },
    getGeolocation() {
      setInterval(() => {
        geolocation
          .getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            maximumAge: 5000,
            timeout: 20000,
          })
          .then((res) => {
            let that = this;
            this.latitude = res.latitude;
            this.longitude = res.longitude;
          });
      }, 2000);
    },
    exitModal() {
      this.$showModal(Exit).then((res) => {
        if (res === "continuar") {
          this.clear();
        } else {
          this.clear();
          this.barBack();
        }
      });
    },
    clear() {
      this.$store.commit("UNSET_BAG");
      this.$store.commit("UNSET_CODE");
      this.$store.commit("UNSET_TRANSITO");
      this.detalles = "";
      this.latitude = "";
      this.longitude = "";
      this.items = [];
    },
    barBack() {
      this.$navigateTo(Home, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease",
        },
      });
    },
  },
};
</script>

<style>
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
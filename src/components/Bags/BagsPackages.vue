<template>
  <Page>
    <ActionBar title="Manejo de Bolsas">
      <NavigationButton android.systemIcon="ic_menu_back" @tap="barBack" />
    </ActionBar>
    <StackLayout>
      <GridLayout rows="auto, auto, auto">
        <StackLayout orientation="horizontal" row="0">
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
          <Button class="scan" text="Código Bolsa" width="140" @tap="doScanWithBackCameraWithFlip" />
          <label
            class="code"
            :text="bagcode"
            width="200"
            verticalAlignment="center"
            horizontalAlignment="center"
          />
          <Button class="auto" text="manu" width="50" @tap="manualCode" />
        </StackLayout>

        <StackLayout orientation="horizontal" row="1" v-if="showScanP">
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
          <Button class="scan2" text="Código Paquetes" width="340" @tap="doScanWithSecundButton" />
          <Button class="auto2" text="manu" width="50" @tap="manualCode2" />
        </StackLayout>

        <StackLayout row="2" v-if="showScanP">
          <ScrollView height="350">
            <ListView for="item in packages">
              <v-template>
                <StackLayout orientation="horizontal" @tap="removeItem(item)">
                  <Label :text="item.code" width="70%" />
                </StackLayout>
              </v-template>
            </ListView>
          </ScrollView>
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import Home from "../Home.vue";
import Pusher from "pusher-nativescript";
var geolocation = require("nativescript-geolocation");
import { Accuracy } from "tns-core-modules/ui/enums";
import { BarcodeScanner } from "nativescript-barcodescanner";
const Dialog = require("tns-core-modules/ui/dialogs");
const PUSHER_APP_KEY = "d4c139db1ff2d4db8cc3";
const PUSHER_APP_CLUSTER = "mt1";
import axios from "axios/dist/axios";
import server from "../../env.dev";
const socket = new Pusher(PUSHER_APP_KEY, {
  cluster: PUSHER_APP_CLUSTER
});
export default {
  name: "BagsPackages",
  data() {
    return {
      bagcode: "",
      isIOS: null,
      latitude: "",
      longitude: "",
      packages: [],
      showScanP: false
    };
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
            this.latitude = res.latitude;
            this.longitude = res.longitude;
          });
      }, 2000);
    },
    render(code) {
      this.$store
        .dispatch("FETCH_BAG_WITH_PACKAGES", code)
        .then(res => {
          if (Object.keys(res).length === 0) {
            alert("No se encontro el código en la base de datos");
          } else {
            this.packages = res.packages;
            this.bagcode = code;
            this.showScanP = true;
          }
        })
        .catch(e => {
          console.log("fail ", e);
        });
    },
    manualCode() {
      Dialog.prompt({
        title: "Ingrese el numero de Código",
        message: "Agrega el Numero de código manual",
        okButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        inputType: Dialog.inputType.number
      })
        .then(r => {
          const channel = socket.subscribe(`channel-${r.text}`);
          channel.bind("NewMessage", () => {
            console.log("oyendo");
            this.render(r.text);
          });
          this.render(r.text);
        })
        .catch(error => {
          console.error(error);
        });
    },
    manualCode2() {
      Dialog.prompt({
        title: "Ingrese el numero de Código",
        message: "Agrega el Numero de código manual",
        okButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        inputType: Dialog.inputType.number
      })
        .then(r => {
          const datos = {
            bag: this.bagcode,
            code: r.text,
            longitude: this.longitude,
            latitude: this.latitude
          };

          axios
            .post(`${server}packages-to-bag`, datos, {
              headers: {
                Accept: "application/json",
                Authorization: this.getCredentials
              }
            })
            .then(res => {
              const channel = socket.subscribe(`channel-${r.text}`);
              channel.bind("NewMessage", () => console.log("oyendo"));
              this.render(this.bagcode);
            });
        })
        .catch(error => {
          console.error(error);
        });
    },
    onScanResult(evt) {
      console.log(`onScanResult: ${evt.text} (${evt.format})`);
    },
    doScanWithBackCameraWithFlip() {
      this.scan(false, true);
    },
    doScanWithSecundButton() {
      this.scan2(false, true);
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
          this.code = result.text;
        })
        .catch(err => {
          alert("No Code in database");
          console.log("No scan. " + err);
        });
    },
    scan2(preferFrontCamera, showFlipCameraButton) {
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
          this.code = result.text;
          console.log("scan2");
        })
        .catch(err => {
          alert("No Code in database");
          console.log("No scan. " + err);
        });
    },
    removeItem(index) {
      Dialog.confirm({
        title: "Sacar paquete de bolsa",
        message: "¿Esta seguro de sacar este paquete de la bolsa",
        okButtonText: "Si, sacar paquete",
        cancelButtonText: "Cancelar"
      }).then(res => {
        if (res === true) {
          const datos = {
            bag: this.bagcode,
            code: index.code,
            longitude: this.longitude,
            latitude: this.latitude
          };
          console.log(datos);
          axios
            .post(`${server}package-remove-bag`, datos, {
              headers: {
                Accept: "application/json",
                Authorization: this.getCredentials
              }
            })
            .then(res => {
              this.render(this.bagcode);
            });
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
  },
  computed: {
    getPackages() {
      return this.$store.getters.getBagPackages;
    },
    getCredentials() {
      return this.$store.getters.getAccessToken;
    }
  },
  mounted() {
    geolocation.enableLocationRequest().then(() => {
      this.getGeolocation();
    });
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

.scan2 {
  margin: 0 auto;
  background-color: rgb(14, 143, 57);
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

.auto2 {
  margin: 0 auto;
  background-color: rgb(231, 235, 15);
  color: rgb(12, 1, 1);
  height: 48;
}

.descripcion {
  text-align: center;
}
</style>
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
        <Button
          class="scan"
          text="Scan Código"
          width="140"
          @tap="doScanWithBackCameraWithFlip"
        />
        <label
          class="code"
          :text="getCode"
          width="200"
          verticalAlignment="center"
          horizontalAlignment="center"
        />
        <Button class="auto" text="auto" width="40" @tap="manualCode" />
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
import Home from "../Home.vue";
import { BarcodeScanner } from "nativescript-barcodescanner";
const camera = require("@nativescript/camera");
var geolocation = require("nativescript-geolocation");
import { Accuracy } from "tns-core-modules/ui/enums";
const dialogs = require('tns-core-modules/ui/dialogs')

export default {
  name: "Transaction",
  methods: {
    manualCode() {
        prompt({
            title: "Ingrese el numero de Código",
            message: "Agrega el Numero de código manual",
            okButtonText: "Enviar",
            cancelButtonText: "Cancelar",
            inputType: dialogs.inputType.number
        }).then(res => {
            console.log(res.text)
        })
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
          let that = this;
          // Cambiar accion por la necesaria
          console.log(result.text);
          //that.$store.commit("SET_CODE", result.text);
        })
        .catch((err) => {
          alert("No Code in database");
          console.log("No scan. " + err);
        });
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
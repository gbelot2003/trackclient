
<template>
  <Page>
    <ActionBar title="BarcodeScanner demo"></ActionBar>

    <GridLayout columns="*" rows="auto, auto, auto">
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
        row="1"
        class="btn btn-primary btn-rounded-sm"
        text="Scan Barcode"
        @tap="doScanWithBackCameraWithFlip"
      ></Button>
      
      <StackLayout row="2">
        <package :item="getPackage"></package>
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
  import { BarcodeScanner } from "nativescript-barcodescanner";
  import Package from './Packages/Package.vue';

  export default {
    components: { Package },
    data() {
      return {
        isIOS: null,
      };
    },
    methods: {
      onScanResult(evt) {
        console.log(`onScanResult: ${evt.text} (${evt.format})`);
      },
      doScanWithBackCameraWithFlip() {
        //this.scan(false, true);
        this.sendCode();
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
              that.$store.dispatch('SEARCH_CODE', result.text);
          }).catch(err => {
            alert("No Code in database");
            console.log("No scan. " + err);
          });
      },
      sendCode(){
        this.$store.dispatch('SEARCH_CODE', 439224452);
      }
    },
    computed:{
      getPackage(){
        return this.$store.getters.getPackage;
      }
    }
  };
</script>            

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }
  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
  }
</style>

<template>
  <Page>
    <ActionBar title="TrackingHn" />
    <StackLayout>
      <Button class="menu-btn" @tap="newPackage" text="Nuevo Paquete"></Button>
      <Button class="menu-btn" text="Multiples Paquetes"></Button>
      <Button class="menu-btn" text="Nuevo Transito"></Button>
      <Button class="menu-btn" text="Nueva Bolsa"></Button>
      <Button class="menu-btn" text="Transito Bolsa"></Button>
      <Button class="menu-btn" text="Manejar Paquetes en Bolsa"></Button>
      <Button class="menu-btn" text="Buscar"></Button>
    </StackLayout>
  </Page>
</template>

<script>
import NewPackage from "./Packages/NewPackage.vue";
var geolocation = require("nativescript-geolocation");
import { Accuracy } from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get

export default {
  data() {
    return {
      current_loc: "",
    };
  },
  mounted() {
    geolocation.enableLocationRequest().then(() => {
      this.getGeolocation();
    });
  },
  methods: {
      newPackage() {
      this.$navigateTo(NewPackage, {
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
</style>

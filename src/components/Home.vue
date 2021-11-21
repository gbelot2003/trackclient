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


export default {
  data() {
    return {};
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

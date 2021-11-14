<template>
  <Page>
    <ActionBar title="Nuevo Paquete">
      <NavigationButton
        android.systemIcon="ic_menu_back"
        @tap="barBack"
      />
    </ActionBar>
    <StackLayout> </StackLayout>
  </Page>
</template>

<script>
import Home from '../Home.vue'

export default {
  name: "NewPackage",
  methods: {
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
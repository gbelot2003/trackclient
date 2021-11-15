<template>
  <Page>
    <ActionBar title="Tipo de paquete">
      <NavigationButton android.systemIcon="ic_menu_back"  @tap="goBack" />
    </ActionBar>
    <StackLayout></StackLayout>
  </Page>
</template>

<script>
import NewPackage from "./NewPackage.vue"

export default {
  name: "SearchType",
  methods: {
    goBack() {
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
<template>
  <Page>
    <ActionBar title="Tipo de paquete">
      <NavigationButton android.systemIcon="ic_menu_back"  @tap="goBack" />
    </ActionBar>
    <StackLayout>

    </StackLayout>
  </Page>
</template>

<script>
import NewPackage from "./NewPackage.vue"
import axios from "axios/dist/axios";

export default {
  name: "SearchType",
  data(){
    return {
      ifForm : false,
      listOfItems: [],
    }
  },
  mounted(){
    this.getTipos();
  },
  methods: {
    getTipos(){
        axios.get("http://192.168.5.108/api/tipos").then((rest) => {
        console.log(rest.data);
        this.listOfItems = rest.data
      });
    },
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
<template>
  <Page>
    <ActionBar title="Tipo de paquete">
      <NavigationButton android.systemIcon="ic_menu_back"  @tap="goBack" />
    </ActionBar>
    <StackLayout>
      <ListPicker :items="listOfItems" v-model="selectedItem"  @selectedIndexChange="selectedIndexChanged"/>
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
      selectedItem: "",
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

    selectedIndexChanged(event){
      console.log($event.value)
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
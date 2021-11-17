<template>
  <Page>
    <ActionBar title="Seleccione Sección Admin">
      <NavigationButton
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack"
      />
    </ActionBar>
    <StackLayout>
      <GridLayout rows="auto, *, auto">
        <StackLayout row="0">
          <TextField
            class="form"
            hint="Buscar Sección"
            @textChange="onTextChange"
          />
        </StackLayout>
        <StackLayout row="1">
          <ListView height="500" class="" for="item in secciones.data">
            <v-template>
              <StackLayout @tap="selected(item)">
                <label class="h6" :text="item.name" />
              </StackLayout>
            </v-template>
          </ListView>
        </StackLayout>
        <StackLayout row="2">
          <button class="btn primary" text="Nueva Sección"  @tap="showModal"/>
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import axios from "axios/dist/axios";
import CreateClient from "../Customers/CreateClient.vue";
import CreateSeccion from "./CreateSection.vue";

export default {
  name: "SelectSection",
  data() {
    return {
      secciones: [],
    };
  },
  mounted() {
    this.fecthSections();
  },
  methods: {
    showModal() {
      this.$showModal(CreateSeccion, { fullscreen: true });
    },
    selected(item) {
      console.log(item);
      this.$store.commit("SET_SECCION", item);
      this.$navigateTo(CreateClient, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease",
        },
      });
    },
    fecthSections() {
      axios.get("http://192.168.5.108/api/secciones").then((rest) => {
        console.log(rest.data);
        this.secciones = rest.data;
      });
    },
    onTextChange(arg) {
      axios
        .get("http://192.168.5.108/api/secciones?string=" + arg.value)
        .then((rest) => {
          console.log(rest.data);
          this.secciones = rest.data;
        });
    },
  },
};
</script>
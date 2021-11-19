<template>
  <Page>
    <ActionBar title="Tipo de paquete">
      <NavigationButton android.systemIcon="ic_menu_back" @tap="goBack" />
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
          <ListView height="500" class="" for="item in tipos.data">
            <v-template>
              <StackLayout @tap="selected(item)">
                <label class="h6" :text="item.name" />
              </StackLayout>
            </v-template>
          </ListView>
        </StackLayout>
        <StackLayout row="2">
          <button class="btn primary" text="Nuevo Tipo" @tap="showModal" />
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import NewPackage from "../Packages/NewPackage.vue";
import CreateType from './CreateType.vue'
import axios from "axios/dist/axios";

export default {
  name: "SearchType",
  data() {
    return {
      ifForm: false,
      tipos: [],
    };
  },
  mounted() {
    this.getTipos();
  },
  methods: {
    showModal() {
      this.$showModal(CreateType, { fullscreen: true });
    },
    selected(item) {
      console.log(item);
      this.$store.commit("SET_TIPO", item);
      this.$navigateTo(NewPackage, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease",
        },
      });
    },
    getTipos() {
      axios.get("http://192.168.5.108/api/tipos").then((rest) => {
        console.log(rest.data);
        this.tipos = rest.data;
      });
    },
    onTextChange(arg) {
      axios
        .get("http://192.168.5.108/api/tipos?string=" + arg.value)
        .then((rest) => {
          console.log(rest.data);
          this.tipos = rest.data;
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
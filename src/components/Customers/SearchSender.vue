<template>
  <Page>
    <ActionBar title="Busqueda de Remitente">
      <NavigationButton android.systemIcon="ic_menu_back" @tap="goBack" />
    </ActionBar>
    <StackLayout>
      <GridLayout rows="auto, *, auto">
        <StackLayout row="0">
          <TextField
            class="input-field input"
            hint="Buscar de Cliente"
            @textChange="onTextChange"
          />
        </StackLayout>
        <StackLayout row="1">
          <ListView height="500" class="" for="item in clientes.data">
            <v-template>
              <StackLayout class="cliente" @tap="selected(item)">
                <label class="h6" :text="item.name" />
                <label class="agencia" :text="item.identaity" />
                <label class="seccion" text="Seccion del Cliente" />
              </StackLayout>
            </v-template>
          </ListView>
        </StackLayout>
        <StackLayout row="2">
          <button class="btn primary" text="Nuevo Cliente" @tap="createClient"/>
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import NewPackage from "../Packages/NewPackage.vue";
import axios from "axios/dist/axios";
import CreateClient from "./CreateClient.vue"

export default {
  name: "SearchSender",
  data() {
    return {
      clientes: [],
    };
  },
  mounted() {
    this.getClientes();
  },
  methods: {
    createClient(){
       this.$navigateTo(CreateClient, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease",
        }, 
      });
    },
    selected(item) {
      console.log(item);
      this.$store.commit("SET_REMITENTE", item);
      this.$navigateTo(NewPackage, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease",
        },
      });
    },
    getClientes() {
      axios.get("http://192.168.5.108/api/clientes").then((rest) => {
        console.log(rest.data);
        this.clientes = rest.data;
      });
    },
    onTextChange(arg) {
      axios.get("http://192.168.5.108/api/clientes?string=" + arg.value).then((rest) => {
        console.log(rest.data);
        this.clientes = rest.data;
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
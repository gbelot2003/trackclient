<template>
  <Page>
    <ActionBar :title="title">
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
          <button
            class="btn primary"
            text="Nuevo Cliente"
            @tap="createClient"
          />
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import NewPackage from "../Packages/NewPackage.vue";
import Newbags from "../Bags/NewBags.vue";
import axios from "axios/dist/axios";
import CreateClient from "./CreateClient.vue";
import server from "../../env.dev";

export default {
  name: "SearchSender",
  props: ["tipo", "fuente"],
  data() {
    return {
      clientes: [],
      title: "",
    };
  },
  mounted() {
    this.getClientes();
  },
  methods: {
    createClient() {
      this.$navigateTo(CreateClient, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease",
        },
        props: {
          tipo: this.tipo,
          fuente: this.fuente
        },
      });
    },
    selected(item) {
      if (this.tipo === "sender") {
        this.$store.commit("SET_REMITENTE", item);
      } else if (this.tipo === "reciver") {
        this.$store.commit("SET_DESTINATARIO", item);
      }

      if (this.fuente === "paquetes") {
        this.$navigateTo(NewPackage, {
          trasition: {
            name: "slide",
            duration: 200,
            curve: "ease",
          },
        });
      } else {
        this.$navigateTo(Newbags, {
          trasition: {
            name: "slide",
            duration: 200,
            curve: "ease",
          },
        });
      }
    },
    getClientes() {
      if (this.tipo === "sender") {
        this.title = "Busqueda de Remitente";
      } else if (this.tipo === "reciver") {
        this.title = "Busqueda de Destinatario";
      }

      axios.get(server + "clientes").then((rest) => {
        //console.log(rest.data);
        this.clientes = rest.data;
      });
    },
    onTextChange(arg) {
      axios.get(server + "clientes?string=" + arg.value).then((rest) => {
        console.log(rest.data);
        this.clientes = rest.data;
      });
    },
    goBack() {
      if (this.fuente === "paquetes") {
        this.$navigateTo(NewPackage, {
          trasition: {
            name: "slide",
            duration: 200,
            curve: "ease",
          },
        });
      } else {
        this.$navigateTo(Newbags, {
          trasition: {
            name: "slide",
            duration: 200,
            curve: "ease",
          },
        });
      }
    },
  },
};
</script>
<template>
  <Page>
    <ActionBar title="Crear Nuevo Cliente">
      <NavigationButton android.systemIcon="ic_menu_back" @tap="goBack" />
    </ActionBar>
    <StackLayout>
      <GridLayout rows="auto, *, auto">
        <StackLayout row="0">
          <TextField hint="Nombre" v-model="name" class="form" />
          <TextField hint="No Identidad" v-model="identity" class="form" />
          <button text="Seleccione Agencia" @tap="selectSettlement" v-if="!getAgencia.name"></button>
          <settlement-items :item="getAgencia" v-if="getAgencia.name"></settlement-items>
        </StackLayout>

        <StackLayout row="1">
          <button text="Agregue la sección" @tap="selectSection" v-if="!getSeccion.name" />
          <section-items :items="getSeccion" v-if="getSeccion.name" />
        </StackLayout>

        <StackLayout row="2">
          <button text="Guardar" class="btn-primary" @tap="createCustomer" />
          <button text="Close" />
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import NewPackage from "../Packages/NewPackage.vue";
import NewBags from "../Bags/NewBags.vue";
import SelectSettement from "../Settlement/SelectSettement.vue";
import SelectSection from "../Sections/SelectSection.vue";

import SettlementItems from "./items/SettlementItems.vue";
import SectionItems from "./items/SectionItems.vue";
import axios from "axios/dist/axios";
import server from "../../env.dev";

export default {
  name: "CreateClient",
  props: ["plantilla", "tipo", "fuente"],
  components: {
    SettlementItems,
    SectionItems
  },
  data() {
    return {
      name: "",
      identity: "",
      items: []
    };
  },
  mounted() {
    console.log(this.tipo);
  },
  methods: {
    selectSettlement() {
      this.$navigateTo(SelectSettement, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        },
        props: {
          tipo: this.tipo,
          fuente: this.fuente
        }
      });
    },
    selectSection() {
      this.$navigateTo(SelectSection, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        },
        props: {
          tipo: this.tipo,
          fuente: this.fuente
        }
      });
    },
    createCustomer() {
      let data = {
        name: this.name,
        identity: this.identity,
        settlement_id: this.getAgencia.id,
        section_id: this.getSeccion.id
      };

      axios
        .post(server + "clientes", data, {
          headers: {
            Accept: "application/json",
            Authorization: this.getCredentials
          }
        })
        .then(res => {
          data = {};
          if (this.tipo === "sender") {
            this.$store.commit("SET_REMITENTE", res.data);
            
          } else if (this.tipo === "reciver") {
            this.$store.commit("SET_DESTINATARIO", res.data);
          }

          if (this.fuente === "paquetes") {
            this.$navigateTo(NewPackage, {
              trasition: {
                name: "slide",
                duration: 200,
                curve: "ease"
              }
            });
          } else {
            this.$navigateTo(NewBags, {
              trasition: {
                name: "slide",
                duration: 200,
                curve: "ease"
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
          alert(err);
        });
    },
    goBack() {
      if (this.fuente === "paquetes") {
        this.$navigateTo(NewPackage, {
          trasition: {
            name: "slide",
            duration: 200,
            curve: "ease"
          }
        });
      } else {
        this.$navigateTo(NewBags, {
          trasition: {
            name: "slide",
            duration: 200,
            curve: "ease"
          }
        });
      }
    }
  },
  computed: {
    getAgencia() {
      return this.$store.getters.getAgencia;
    },
    getCredentials() {
      return this.$store.getters.getAccessToken;
    },
    getSeccion() {
      return this.$store.getters.getSeccion;
    },
    isValid() {
      return true;
    }
  }
};
</script>

<style scoped>
</style>
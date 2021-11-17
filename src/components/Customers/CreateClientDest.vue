<template>
  <Page>
    <ActionBar title="Crear Nuevo Cliente">
      <NavigationButton
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack"
      />
    </ActionBar>
    <StackLayout>
      <GridLayout rows="auto, *, auto">
        <StackLayout row="0">
          <TextField hint="Nombre" v-model="name" class="form" />
          <TextField hint="No Identidad" v-model="identity" class="form" />
          <button
            text="Seleccione Agencia"
            @tap="selectSettlement"
            v-if="!getAgencia.name"
          ></button>
          <settlement-items
            :item="getAgencia"
            v-if="getAgencia.name"
          ></settlement-items>
        </StackLayout>

        <StackLayout row="1">
          <button
            text="Agregue la sección"
            @tap="selectSection"
            v-if="!getSeccion.name"
          />
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
import SelectSettement from "../Settlement/SelectSettement.vue";
import SelectSection from "../Sections/SelectSection.vue";
import SettlementItems from "./items/SettlementItems.vue";
import SectionItems from "./items/SectionItems.vue";
import axios from "axios/dist/axios";

export default {
  name: "CreateClient",
  props: ["plantilla"],
  components: {
    SettlementItems,
    SectionItems,
  },
  data() {
    return {
      name: "",
      identity: "",
      items: [],
    };
  },
  methods: {
    selectSettlement() {
      this.$navigateTo(SelectSettement, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease",
        },
      });
    },
    selectSection() {
      this.$navigateTo(SelectSection, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease",
        },
      });
    },
    createCustomer() {
      let data = {
        name: this.name,
        identity: this.identity,
        settlement_id: this.getAgencia.id,
        section_id: this.getSeccion.id,
      };

      axios
        .post("http://192.168.5.108/api/clientes", data)
        .then((res) => {
          console.log(res.data);
          (data = {}), this.$store.commit("SET_DESTINATARIO", res.data);

          this.$navigateTo(NewPackage, {
            trasition: {
              name: "slide",
              duration: 200,
              curve: "ease",
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    getAgencia() {
      return this.$store.getters.getAgencia;
    },
    getSeccion() {
      return this.$store.getters.getSeccion;
    },
    isValid() {
      return true;
    },
  },
};
</script>

<style scoped>
</style>
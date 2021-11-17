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
          <button text="Salvar" />
          <button text="Close" />
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import SelectSettement from "../Settlement/SelectSettement.vue";
import SelectSection from "../Sections/SelectSection.vue";
import SettlementItems from "./items/SettlementItems.vue";
import SectionItems from "./items/SectionItems.vue";

export default {
  name: "CreateClient",
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
  },
  computed: {
    getAgencia() {
      return this.$store.getters.getAgencia;
    },
    getSeccion() {
      return this.$store.getters.getSeccion;
    },
  },
};
</script>

<style scoped>
</style>
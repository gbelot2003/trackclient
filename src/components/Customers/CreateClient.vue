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
          <TextField hint="Nombre" v-model="name" />
          <TextField hint="No Identidad" v-model="identity" />
          <button text="Seleccione Agencia" @tap="selectSettlement"></button>
          /** aqui settlementitem desde Vuex */
        </StackLayout>

        <StackLayout row="1">
          <button text="Agregue la sección"></button>
          
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
import SelectSettement from '../Settlement/SelectSettement.vue'
import SettlementItems from './items/SettlementItems.vue'

export default {
  name: "CreateClient",
  components: {
    SettlementItems
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
  },
};
</script>

<style scoped>
</style>
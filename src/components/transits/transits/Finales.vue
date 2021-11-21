<template>
  <StackLayout class="p-t-20">
    <Label class="header" text="Selección de Transito Regular" />
    <GridLayout rows=" *, auto">
      <StackLayout row="0">
        <ListView height="500" class="" for="item in ValueList">
          <v-template>
            <Label :text="item.display" @tap="selectValue(item.value)" />
          </v-template>
        </ListView>
      </StackLayout>
      <StackLayout row="1">
        <Button text="Cerrar" @tap="closeModal" />
      </StackLayout>
    </GridLayout>
  </StackLayout>
</template>

<script>
import { ValueList } from "nativescript-drop-down";

export default {
  name: "Regular",
  methods: {
    selectValue(item) {
      this.$store.commit('SET_TRANSITO', item)
      this.$modal.close();
    },
    closeModal() {
      this.$modal.close();
    },
  },
  data() {
    return {
      itemId: "",
      ValueList: [
        { display: "Entregado a Terceros (Continua)", value: 7 },
        { display: "Entregado y Cerrado", value: 11 },
        { display: "Entregado con Observaciones", value: 12 },
        { display: "Entregado a Terceros (Final)", value: 13 },
        { display: "Exrabiado", value: 8 },
        { display: "Robado", value: 9 },
        { display: "Dañado Completamente", value: 10 },
      ],
    };
  },
};
</script>

<style>
.header {
  color: red;
}
</style>
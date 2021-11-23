<template>
  <StackLayout class="p-t-20">
    <Label class="header" text="Selección de Transito Regular" />
    <GridLayout rows=" *, auto">
      <StackLayout row="0">
        <ListView height="500" class="" for="item in ValueList">
          <v-template>
            <Label :text="item.name" @tap="selectValue(item)" />
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
      this.$store.commit("SET_TRANSITO", item);
      this.$modal.close("alive");
    },
    closeModal() {
      this.$modal.close("close");
    },
  },
  data() {
    return {
      itemId: "",
      ValueList: [
        {
          id: 7,
          name: "Entregada a terceros (Tránsitos continuan)",
          description:
            "La encomienda a pasado a manos de terseras personas o empresas para su manejo y entrega en otra agencia del banco.",
        },
        {
          id: 11,
          name: "Entregado y Cerrado",
          description: "La encomienda a sido entregada sin observaciones",
        },
        {
          id: 12,
          name: "Entregado con observaciones",
          description:
            "La encomienda a sido entregada y hay observaciones en su entrega",
        },
        {
          id: 13,
          name: "Entregado a terceros, entrega final",
          description:
            "Se entrega a otra empresa de mensajería o a personal autorizados por la empresa para entregar la encomienda en su destino. La encomiendas salieron definitivamente del sistema.",
        },
        {
          id: 8,
          name: "Extraviado",
          description:
            "La encomienda se a extraviado en algun punto en la linea de Tránsito",
        },
        { id: 9, name: "Robado", description: "El paquete a sido robado." },
        {
          id: 10,
          name: "Dañado por completo",
          description: "El paquete a sido dañado comp0letamente.",
        },
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
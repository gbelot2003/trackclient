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
      this.$modal.close();
    },
    closeModal() {
      this.$modal.close();
    },
  },
  data() {
    return {
      ValueList: [
        {
          id: 2,
          name: "Tránsito, regular",
          description:
            "La encomienda a ingresado a la linea de entragas y esta en manos de la empresa de mensajeria.",
        },
        {
          id: 3,
          name: "Tránsito, Centro de acopio",
          description:
            "La encomienda a ingresado a el centro de acopio descrito.",
        },
        {
          id: 4,
          name: "Tránsito, en bolsa de transporte",
          description:
            "El paquete a ingresado a una bolsa para su traslado a destinos posteriores o su entrega.",
        },
        {
          id: 6,
          name: "Tránsito, presenta daños graves",
          description:
            "La encomienda presenta daños severos, sellos violentados, ruturas, contenido roto etc.",
        },
      ],
    };
  },
};
</script>
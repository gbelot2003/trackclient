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
      this.itemId = item;
    },
    closeModal() {
      this.$modal.close();
    },
  },
  data() {
    return {
      ValueList: [
        { display: "Transito Regular", value: 2 },
        { display: "Transito Centro de Acopio", value: 3 },
        { display: "Transito Presenta daños ligeros", value: 4 },
        { display: "Transito Presenta daños graves", value: 6 },
      ],
    };
  },
};
</script>
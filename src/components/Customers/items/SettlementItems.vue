<template>
  <GridLayout columns="*, auto" height="155">
    <StackLayout class="item" col="0">
      <label class="h6 title" text="Agencia Seleccionada"></label>
      <label class="h6 label" :text="item.name"></label>
      <department :department="item.department"></department>
      <municipality :municipality="item.municipality"></municipality>
      <Label :text="item.address" />
    </StackLayout>
    <StackLayout col="1">
      <button
        text="Cancelar"
        class="cancel"
        height="145"
        @tap="remove"
      ></button>
    </StackLayout>
  </GridLayout>
</template>

<script>
import Department from './Department.vue'
import Municipality from './Municipality.vue'
export default {
  name: "SettlementItems",
  props: ["item", "title"],
  components: {
    Department, Municipality
  },
  methods: {
    remove() {
      this.$store.commit("UNSET_AGENCIA");
    },
  },
};
</script>

<style scoped>
.item {
  margin-top: 15;
  margin-left: 5;
  margin-right: 5;
  margin-bottom: 5;
  padding-left: 20;
  padding-bottom: 10;
  padding-right: 10;
  background-color: rgb(221, 214, 214);
  text-align: right;
}

.title {
  text-align: right;
  color: white;
}

.label {
  margin: 0;
}

.cancel {
  margin-top: 10;
  padding-left: 10;
  padding-right: 10;
}
</style>
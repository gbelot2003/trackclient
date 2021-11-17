<template>
  <GridLayout columns="*, auto" height="100">
    <StackLayout class="item" col="0">
      <label class="h6 title" text="Seccion Administrativa"></label>
      <Label class="h6 label" :text="items.name" />
    </StackLayout>
    <StackLayout col="1">
      <button text="Cancelar" class="cancel" height="90" @tap="remove"></button>
    </StackLayout>
  </GridLayout>
</template>

<script>
export default {
  name: "SectionItems",
  props: ["items"],
  methods: {
    remove() {
      this.$store.commit("UNSET_SECCION");
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
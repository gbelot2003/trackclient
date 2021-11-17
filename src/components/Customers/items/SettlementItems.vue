<template>
  <GridLayout columns="*, auto" height="50">
    <StackLayout class="item" col="0">
      <label class="h5 title" :text="title"></label>
    </StackLayout>
    <StackLayout col="1">
      <button text="Cancelar" height="35" @tap="remove"></button>
    </StackLayout>
  </GridLayout>
</template>

<script>


export default {
  
  name: "SettlementItems",
  props: ["item", "title"],
  methods: {
    remove() {
  
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  color: white;
}

.item {
  margin-top: 15;
  margin-left: 5;
  margin-right: 5;
  margin-bottom: 5;
  padding-left: 20;
  padding-bottom: 10;
  background-color: rgb(221, 214, 214);
}

.label {
  margin: 0;
}
</style>
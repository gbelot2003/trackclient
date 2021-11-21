<template>
  <StackLayout>
    <GridLayout columns="*, auto" height="100">
      <StackLayout class="item" col="0">
        <label class="h5 title" text="Tipo"></label>
        <label class="h6 label" :text="item.name" />
      </StackLayout>

      <StackLayout col="1">
        <button text="Cancelar" height="90" @tap="remove"></button>
      </StackLayout>
    </GridLayout>
  </StackLayout>
</template>

<script>
export default {
  name: "TypeItem",
  props: ["item"],
  methods: {
    remove() {
      this.$store.commit("UNSET_TIPO");
    },
  },
};
</script>
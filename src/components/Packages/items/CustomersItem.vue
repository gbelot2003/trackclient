<template>
  <GridLayout columns="*, auto" height="165">
    <StackLayout class="item" col="0">
      <label class="h5 title" :text="title"></label>
      <label class="h6 label" :text="item.name"></label>
      <label class="label" :text="item.identity" v-if="item.identity"></label>
      <settlement :settlement="item.settlement"></settlement>
      <section :section="item.section"></section>
    </StackLayout>
    <StackLayout col="1">
      <button text="Cancelar" height="155" @tap="remove"></button>
    </StackLayout>
  </GridLayout>
</template>

<script>
import Settlement from "./Settlement.vue";
import Section from "./Section.vue";

export default {
  components: { Settlement, Section },
  name: "CustomersItem",
  props: ["item", "title"],
  Components: {
    Settlement,
    Section,
  },
  methods: {
    remove() {
      if (this.title === "Remitente") {
        this.$store.commit("UNSET_REMITENTE");
      } else {
        this.$store.commit("UNSET_DESTINATARIO");
      }
    },
  },
};
</script>

<style scoped>

</style>
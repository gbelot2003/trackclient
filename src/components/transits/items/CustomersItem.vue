<template>
  <GridLayout columns="*" height="165">
    <StackLayout class="item" col="0">
      <label class="h5 title" :text="title"></label>
      <label class="h6 label" :text="item.name"></label>
      <label class="label" :text="item.identity"></label>
      <settlement :settlement="item.settlement"></settlement>
      <section :section="item.section"></section>
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
  },
};
</script>

<style scoped>

</style>
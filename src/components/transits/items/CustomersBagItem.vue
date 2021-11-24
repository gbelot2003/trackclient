<template>
  <GridLayout columns="*" height="165">
    <StackLayout class="item" col="0">
      <label class="h5 title" :text="title"></label>
      <settlement class="h6" :settlement="item.settlement"></settlement>
      <section :section="item.section"></section>
      <label class="label" :text="item.name"></label>
      
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
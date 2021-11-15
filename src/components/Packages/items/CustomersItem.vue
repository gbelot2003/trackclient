<template>
    <StackLayout class="item">
        <label class="h5 title" text="Remitente"></label>
        <label class="h6 label" :text="item.name"></label>
        <label class="label" :text="item.identity"></label>
        <settlement :settlement="item.settlement"></settlement>
        <section :section="item.section"></section>
    </StackLayout>
</template>

<script>
import Settlement from './Settlement.vue'
import Section from './Section.vue'

export default {
  components: { Settlement, Section },
    name: 'CustomersItem',
    props: ['item'],
    Components: {
        Settlement, Section
    }
}
</script>

<style scoped>
    .title {
        text-align: center;
    }

    .item {
        margin-top:15;
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
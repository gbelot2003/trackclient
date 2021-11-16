<template>
  <Page>
    <StackLayout>
      <Label class="h4" text="Nueva Agencia" />
      <TextField hint="Nombre" v-model="name" />
      
      <StackLayout orientation="horizontal">
        <button @tap="onClose" text="Salvar" />
        <button @tap="onClose" text="Close" />
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
export default {
  name: "CreateClient",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    onClose() {
      this.$modal.close();
    },
  },
};
</script>

<style scoped>
</style>
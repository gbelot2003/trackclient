<template>
  <Page>
    <ActionBar title="Crear Nuevo Cliente">
      <NavigationButton android.systemIcon="ic_menu_back" @tap="$navigateBack" />
    </ActionBar>
    <StackLayout>
      <TextField hint="Nombre" v-model="name" />

      <StackLayout orientation="horizontal">
        <button @tap="openModal" text="Salvar" />
        <button text="Close" />
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

  },
};
</script>

<style scoped>
</style>
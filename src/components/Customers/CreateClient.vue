<template>
  <Page>
    <ActionBar title="Crear Nuevo Cliente">
      <NavigationButton
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack"
      />
    </ActionBar>
    <StackLayout>
      <TextField hint="Nombre" v-model="name" />
      <StackLayout>
        <label text="Seleccione Agencia"></label>
      </StackLayout>
      <StackLayout>
        <label text="Agregue la sección"></label>
      </StackLayout>
      <StackLayout orientation="horizontal">
        <button text="Salvar" />
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
      items: [],

    };
  },
  methods: {},
};
</script>

<style scoped>
</style>
<template>
  <Page>
    <ActionBar title="Seleccione Agencia">
      <NavigationButton
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack"
      />
    </ActionBar>
    <StackLayout>
      <GridLayout rows="auto, *, auto">
        <StackLayout row="0">
          <TextField
            class="input-field input"
            hint="Buscar Agencia"
            
          />
        </StackLayout>
         <StackLayout row="1">
           
         </StackLayout>
      </GridLayout>
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
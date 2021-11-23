<template>
  <Page>
    <StackLayout class="p-t-20">
      <Label class="header" text="Creacion de Sección" />
      <GridLayout rows="auto, *, auto">
        <StackLayout row="0">
          <TextField hint="Nombre" v-model="fields.name" class="form" />
        </StackLayout>

        <StackLayout row="1"></StackLayout>

        <StackLayout row="2">
          <button
            text="Guardar"
            @tap="saveData"
            class="btn-primary"
            v-if="isValid"
          ></button>
          <button text="Close" @tap="closeModal"></button>
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import axios from "axios/dist/axios";
import CreateClient from "../Customers/CreateClient.vue";
import server from '../../env.dev'

export default {
  name: "CreateSettlement",
  data() {
    return {
      fields: {
        name: "",
      },
    };
  },

  methods: {
    saveData() {
      axios
        .post(server + "secciones", this.fields)
        .then((res) => {
          console.log(res.data);
          this.$store.commit("SET_SECCION", res.data);
          this.$navigateTo(CreateClient, {
            trasition: {
              name: "slide",
              duration: 200,
              curve: "ease",
            },
          });
          this.$modal.close();
        });

      //
    },
    closeModal() {
      this.$modal.close();
    },
  },
  computed: {
    isValid() {
      if (this.fields.name === "") {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
</style>
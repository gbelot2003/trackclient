<template>
  <Page @loaded="loaded">
    <StackLayout class="p-t-20">
      <Label class="header" text="Creacion de Agencia" />
      <GridLayout rows="auto, auto, *, auto">
        <StackLayout row="0">
          <TextField hint="Nombre" v-model="fields.name" class="form" />
        </StackLayout>

        <StackLayout row="1">
          <DropDown
            :items="departamentos"
            hint="Seleccione Departamento"
            selectedIndex="0"
            @selectedIndexChanged="SelectedDeptChange"
            class="form"
          />

          <DropDown
            v-if="showMunic"
            :items="municipios"
            hint="Seleccione Municipio"
            selectedIndex="1"
            @selectedIndexChanged="SelectedMunicChage"
            class="form selected"
          />
          <TextView hint="Dirección" class="form" v-model="fields.address" />
        </StackLayout>
        <StackLayout row="2"></StackLayout>

        <StackLayout row="3">
          <button text="Guardar" @tap="saveData" class="btn-primary" v-if="isValid"></button>
          <button text="Close" @tap="closeModal"></button>
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import axios from "axios/dist/axios";
import { ValueList } from "nativescript-drop-down";
import CreateClient from "../Customers/CreateClient.vue";
import server from "../../env.dev";

export default {
  name: "CreateSettlement",
  props: ["tipo", "fuente"],
  data() {
    return {
      fields: {
        name: "",
        address: "",
        department_id: "",
        municipality_id: ""
      },
      departamentos: [],
      municipios: [],
      showMunic: false
    };
  },
  computed: {
    isValid() {
      if (
        this.fields.name === "" ||
        this.fields.address === "" ||
        this.fields.department_id === "" ||
        this.fields.municipality_id === ""
      ) {
        return false;
      }
      return true;
    },
    getCredentials() {
      return this.$store.getters.getAccessToken;
    }
  },
  methods: {
    loaded() {
      axios
        .get(server + "departamentos", {
          headers: {
            Accept: "application/json",
            Authorization: this.getCredentials
          }
        })
        .then(res => {
          this.departamentos = new ValueList(res.data);
        });
    },
    SelectedDeptChange(args) {
      let number = args.newIndex + 1;
      this.fields.department_id = number;
      axios
        .get(server + "municipios/" + number, {
          headers: {
            Accept: "application/json",
            Authorization: this.getCredentials
          }
        })
        .then(res => {
          this.showMunic = true;
          this.municipios = new ValueList(res.data);
          console.log(this.municipios);
        });
    },
    SelectedMunicChage(args) {
      let index = args.newIndex;
      let muni = this.municipios._array;
      this.fields.municipality_id = muni[index].value;
      console.log(muni[index]);
    },
    saveData() {
      console.log(this.fields);

      axios
        .post(server + "agencias", this.fields, {
          headers: {
            Accept: "application/json",
            Authorization: this.getCredentials
          }
        })
        .then(res => {
          console.log(res.data);
          this.$store.commit("SET_AGENCIA", res.data);
          this.$navigateTo(CreateClient, {
            trasition: {
              name: "slide",
              duration: 200,
              curve: "ease"
            },
            props: {
              tipo: this.tipo,
              fuente: this.fuente
            }
          });
          this.$modal.close();
        });
    },
    closeModal() {
      this.$modal.close();
    }
  }
};
</script>

<style scoped>
</style>
<template>
  <Page @loaded="loaded">
    <StackLayout class="p-t-20">
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
import { ValueList } from "nativescript-drop-down";
import CreateClient from "../Customers/CreateClient.vue";

export default {
  name: "CreateSettlement",
  data() {
    return {
      fields: {
        name: "",
        address: "",
        department_id: "",
        municipality_id: "",
      },
      departamentos: [],
      municipios: [],
      showMunic: false,
    };
  },

  methods: {
    loaded() {
      axios.get("http://192.168.5.108/api/departamentos").then((res) => {
        this.departamentos = new ValueList(res.data);
      });
    },
    SelectedDeptChange(args) {
      let number = args.newIndex + 1;
      this.fields.department_id = number;
      axios.get("http://192.168.5.108/api/municipios/" + number).then((res) => {
        console.log(res.data);
        this.showMunic = true;
        this.municipios = new ValueList(res.data);
      });
    },
    SelectedMunicChage(args) {
      let number = args.newIndex + 1;
      this.fields.municipality_id = number;
    },
    saveData() {
      axios
        .post("http://192.168.5.108/api/agencias", this.fields)
        .then((res) => {
          console.log(res.data);
          this.$store.commit("SET_AGENCIA", res.data);
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
  },
};
</script>

<style scoped>
.form {
  margin-bottom: 20;
  font-size: 16;
  placeholder-color: rgb(223, 203, 203);
  padding-left: 5;
}

.selected {
  background-color: rgb(194, 166, 166);
  padding-top: 10;
  padding-bottom: 10;
}
</style>
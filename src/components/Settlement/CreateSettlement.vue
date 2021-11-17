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

export default {
  name: "CreateSettlement",
  data() {
    return {
      fields: {
        name: "",
        address: "",
        departamento: "",
        municipio: "",
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
      this.fields.departamento = number;
      axios.get("http://192.168.5.108/api/municipios/" + number).then((res) => {
        console.log(res.data);
        this.showMunic = true;
        this.municipios = new ValueList(res.data);
      });
    },
    SelectedMunicChage(args) {
      let number = args.newIndex + 1;
      this.fields.municipio = number;
    },
    saveData() {
      console.log(this.fields);
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
        this.fields.departamento === "" ||
        this.fields.municipio === ""
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
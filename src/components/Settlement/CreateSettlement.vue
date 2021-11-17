<template>
  <Page @loaded="loaded">
    <StackLayout class="p-t-20">
      <GridLayout rows="auto, auto, *, auto">
        <StackLayout  row="0">
          <TextField hint="Nombre" v-model="name" class="form"/>
        </StackLayout>

        <StackLayout row="1">
          <DropDown
          
            :items="departamentos"
            hint="Seleccione Departamento"
            selectedIndex="1"
            @selectedIndexChanged="SelectedDeptChange"
            class="form"
          />

          <DropDown
            v-if="showMunic"
            :items="municipios"
            hint="Seleccione Municipio"
            selectedIndex="1"
            class="form selected"
          />
          <TextView hint="Dirección" class="form" v-model="address" />
        </StackLayout>
        <StackLayout row="2"></StackLayout>

        <StackLayout row="3">
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
      name: "",
      address: "",
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
      axios.get("http://192.168.5.108/api/municipios/" + number).then((res) => {
        console.log(res.data);
        this.showMunic = true;
        this.municipios = new ValueList(res.data);
      });
    },
    closeModal() {
      this.$modal.close();
    },
  },
};
</script>

<style scoped>
    .form {
        margin-bottom: 20;
        font-size: 16;
        placeholder-color: rgb(223, 203, 203);
    }

    .selected {
        background-color: rgb(194, 166, 166);
    }
</style>
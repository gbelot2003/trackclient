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
            @textChange="onTextChange"
          />
        </StackLayout>
        <StackLayout row="1">
          <ListView height="500" class="" for="item in agencias.data">
            <v-template>
              <StackLayout>
                <label class="h6" :text="item.name" />
              </StackLayout>
            </v-template>
          </ListView>
        </StackLayout>

        <StackLayout row="2">
          <button class="btn primary" text="Nueva Agencia" />
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import axios from "axios/dist/axios";

export default {
  name: "SelectSettement",
  data() {
    return {
      agencias: [],
    };
  },
  mounted() {
    this.getAgencias();
  },
  methods: {
    getAgencias() {
      axios.get("http://192.168.5.108/api/agencias").then((rest) => {
        console.log(rest.data);
        this.agencias = rest.data;
      });
    },
    onTextChange(arg) {
      axios
        .get("http://192.168.5.108/api/agencias?string=" + arg.value)
        .then((rest) => {
          console.log(rest.data);
          this.agencias = rest.data;
        });
    },
  },
};
</script>

<style scoped>
</style>
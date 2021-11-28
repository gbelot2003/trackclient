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
          <ListView height="500" for="item in agencias">
            <v-template>
              <StackLayout @tap="selected(item)">
                <label class="h6" :text="item.name" />
              </StackLayout>
            </v-template>
          </ListView>
        </StackLayout>

        <StackLayout row="2">
          <button class="btn primary" text="Nueva Agencia" @tap="showModal" />
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import axios from "axios/dist/axios";
import CreateSettlement from "./CreateSettlement.vue";
import server from "../../env.dev";



export default {
  name: "SelectSettement",
  data() {
    return {
      agencias: [],
    };
  },
  props: ["tipo", "fuente"],
  mounted() {
    this.getAgencias();
  },
  computed: {
    fetchAgencias(){
      return this.$store.getters.getAgencias
    }
  },
  methods: {
    showModal() {
      this.$showModal(CreateSettlement, {
        fullscreen: true,
        props: { tipo: this.tipo, fuente: this.fuente },
      });
    },
    selected(item) {
      console.log(item);
      this.$store.commit("SET_AGENCIA", item);
      this.$navigateBack({
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease",
        },
        props: {
          tipo: this.tipo,
          fuente: this.fuente,
        },
      });
    },
    getAgencias() {
      this.$store.dispatch('FETCH_AGENCIAS').then(() => {
        this.agencias = this.fetchAgencias
      })
    },
    onTextChange(arg) {
      this.$store.dispatch('FETCH_SAGENCIAS', arg.value).then(() => {
        this.agencias = this.fetchAgencias
      })
    },
  },
};
</script>

<style scoped>
</style>
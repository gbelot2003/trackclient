<template>
  <Page>
    <ActionBar title="Seleccione Sección Admin">
      <NavigationButton android.systemIcon="ic_menu_back" @tap="$navigateBack" />
    </ActionBar>
    <StackLayout>
      <GridLayout rows="auto, *, auto">
        <StackLayout row="0">
          <TextField class="form" hint="Buscar Sección" @textChange="onTextChange" />
        </StackLayout>
        <StackLayout row="1">
          <ListView height="500" class for="item in secciones">
            <v-template>
              <StackLayout @tap="selected(item)">
                <label class="h6" :text="item.name" />
              </StackLayout>
            </v-template>
          </ListView>
        </StackLayout>
        <StackLayout row="2">
          <button class="btn primary" text="Nueva Sección" @tap="showModal" />
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import CreateSeccion from "./CreateSection.vue";

export default {
  name: "SelectSection",
  props: ["tipo", "funete"],
  data() {
    return {
      secciones: []
    };
  },
  mounted() {
    this.fecthSections();
  },
  computed: {
    getSecciones() {
      return this.$store.getters.getSecciones;
    }
  },
  methods: {
    showModal() {
      this.$showModal(CreateSeccion, {
        fullscreen: true,
        props: { tipo: this.tipo, fuente: this.fuente }
      });
    },
    selected(item) {
      console.log(item);
      this.$store.commit("SET_SECCION", item);
      this.$navigateBack({
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        }
      });
    },
    fecthSections() {
      this.$store.dispatch("FETCH_SECCIONES").then(() => {
        this.secciones = this.getSecciones;
      });
    },
    onTextChange(arg) {
      this.$store.dispatch("SEARCH_SECCIONES", arg.value).then(() => {
        this.secciones = this.getSecciones;
      });
    }
  }
};
</script>
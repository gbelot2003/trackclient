<template>
  <Page>
    <ActionBar title="Tipo de paquete">
      <NavigationButton android.systemIcon="ic_menu_back" @tap="goBack" />
    </ActionBar>
    <StackLayout>
      <GridLayout rows="auto, *, auto">
        <StackLayout row="0">
          <TextField class="form" hint="Buscar Sección" @textChange="onTextChange" />
        </StackLayout>
        <StackLayout row="1">
          <ListView height="500" class for="item in tipos">
            <v-template>
              <StackLayout @tap="selected(item)">
                <label class="h6" :text="item.name" />
              </StackLayout>
            </v-template>
          </ListView>
        </StackLayout>
        <StackLayout row="2">
          <button class="btn primary" text="Nuevo Tipo" @tap="showModal" />
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import NewPackage from "../Packages/NewPackage.vue";
import CreateType from "./CreateType.vue";

export default {
  name: "SearchType",
  data() {
    return {
      ifForm: false,
      tipos: []
    };
  },
  mounted() {
    this.setTipos();
  },
  computed: {
    getTipos() {
      return this.$store.getters.getTipos;
    }
  },
  methods: {
    showModal() {
      this.$showModal(CreateType, { fullscreen: true });
    },
    selected(item) {
      console.log(item);
      this.$store.commit("SET_TIPO", item);
      this.$navigateTo(NewPackage, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        }
      });
    },
    setTipos() {
      this.$store.dispatch("FETCH_TYPES").then(() => {
        this.tipos = this.getTipos
      });
    },
    onTextChange(arg) {
      this.$store.dispatch("FETCH_STYPES", arg.value).then(() => {
        this.tipos = this.getTipos
      });

    },
    goBack() {
      this.$navigateTo(NewPackage, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        }
      });
    }
  }
};
</script>
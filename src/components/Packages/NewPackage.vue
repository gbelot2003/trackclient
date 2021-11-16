<template>
  <Page>
    <ActionBar title="Nuevo Paquete">
      <NavigationButton android.systemIcon="ic_menu_back" @tap="barBack" />
    </ActionBar>
    <StackLayout>
      <StackLayout orientation="horizontal">
        <Button class="scan" text="Código" width="140" />
        <label
          class="code"
          :text="code"
          width="200"
          verticalAlignment="center"
          horizontalAlignment="center"
        />
        <Button class="auto" text="auto" width="40" @tap="autocode" />
      </StackLayout>

      <StackLayout>
        <Button text="Remitente" @tap="remitente" v-if="!getRemitente.name" />
        <customers-item :item="getRemitente" title="Remitente"  v-if="getRemitente.name"></customers-item>
      </StackLayout>

      <StackLayout>
        <Button text="Destinatario" @tap="destinatario" v-if="!getDestinatario.name" />
        <customers-item :item="getDestinatario" title="Destinatario"  v-if="getDestinatario.name"></customers-item>
      </StackLayout>

      <StackLayout>
        <Button text="Tipo de Paquete" @tap="tipo" />
      </StackLayout>

      <StackLayout>
        <Button text="Descripción o Detalle" />
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
import Home from "../Home.vue";
import SearchReciber from "./SearchReciver.vue";
import SearchSender from "./SearchSender.vue";
import SearchType from "./SearchType.vue"
import CustomersItem from './items/CustomersItem.vue'

export default {
  name: "NewPackage",
  data() {
    return {
      code: "",
    };
  },
  components: {
    CustomersItem
  },
  computed: {
    getRemitente(){
      return this.$store.getters.getRemitente
    },
    getDestinatario(){
      return this.$store.getters.getDestinatario
    }
  },
  methods: {
    autocode() {
      this.code = Math.floor(Math.random() * 999999999) + 111111111;
    },

    remitente() {
      this.$navigateTo(SearchSender, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease",
        },
      });
    },

    destinatario() {
      this.$navigateTo(SearchReciber, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease",
        },
      });
    },

    tipo() {
      this.$navigateTo(SearchType, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease",
        },
      });
    },

    barBack() {
      this.$navigateTo(Home, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease",
        },
      });
    },
  },
};
</script>

<style scoped>
.scan {
  margin: 0 auto;
  background-color: darkslategray;
  color: white;
  height: 48;
}

.code {
  text-align: center;
  font-weight: 900;
  font-size: 14;
  background-color: gray;
  height: 35;
  margin: 0 !important;
  padding-top: 6;
  color: white;
}

.auto {
  margin: 0 auto;
  background-color: darkcyan;
  color: white;
  height: 48;
}
</style>
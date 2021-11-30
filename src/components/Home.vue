<template>
  <Page>
    <ActionBar title="TrackingHn" />
    <GridLayout rows="*, auto">
      <StackLayout row="0">
        <Button class="menu-btn" @tap="newPackage" text="Nuevo Paquete"></Button>
        <Button class="menu-btn" @tap="transaction" text="Nuevo Transito"></Button>
        <Button class="menu-btn" @tap="newBags" text="Nueva Bolsa"></Button>
        <Button class="menu-btn" text="Transito Bolsa" @tap="transactionBag"></Button>
        <Button class="menu-btn" text="Manejar Paquetes en Bolsa" @tap="bagsPackages"></Button>
      </StackLayout>
      <StackLayout row="1">
        <Button class="menu-btn" text="Logout" @tap="logout" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import NewPackage from "./Packages/NewPackage.vue";
import Transaction from "./transits/Transaction.vue";
import NewBag from "./Bags/NewBags.vue";
import TransactionBagVue from "./transits/TransactionBag.vue";
import BagsPackagesVue from "./Bags/BagsPackages.vue";
import App from "./App.vue";

export default {
  methods: {
    transactionBag() {
      this.$navigateTo(TransactionBagVue, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        }
      });
    },
    bagsPackages() {
      this.$navigateTo(BagsPackagesVue, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        }
      });
    },
    newBags() {
      this.$navigateTo(NewBag, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        }
      });
    },
    transaction() {
      this.$navigateTo(Transaction, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        }
      });
    },
    newPackage() {
      this.$navigateTo(NewPackage, {
        trasition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        }
      });
    },
    logout() {
      console.log("hiter");
      this.$store
        .dispatch("AUTH_LOGOUT")
        .then(resp => {
          if (resp.data === "Logged out") {
            this.processing = false;
            this.$navigateTo(App);
            alert("Ha salido del sistema")
          } else {
            alert(
              "Hay algun problema en el registro de logueo, intente mas tarde"
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>            

<style scoped>
</style>

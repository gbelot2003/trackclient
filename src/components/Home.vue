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
        <Button class="menu-btn" text="Logout"></Button>
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
    }
  }
};
</script>            

<style scoped>
</style>

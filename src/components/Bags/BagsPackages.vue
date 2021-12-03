<template>
  <Page>
    <ActionBar title="Manejo de Bolsas">
      <NavigationButton android.systemIcon="ic_menu_back" @tap="barBack" />
    </ActionBar>
    <StackLayout>
        <Label :text="message" />
    </StackLayout>
  </Page>
</template>

<script>
import Home from "../Home.vue";
import Pusher from "pusher-nativescript";
const PUSHER_APP_KEY = "d4c139db1ff2d4db8cc3";
const PUSHER_APP_CLUSTER = "mt1";

export default {
  name: "BagsPackages",
  data(){
    return {
        message: 'aa',
        channelNumber: 85,
    }
  },
  created() {
    const socket = new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_APP_CLUSTER
    });

    const channel = socket.subscribe("test-channel-85");
    
    channel.bind("NewMessage",  (data) =>  this.message = data.message);
  },
  methods: {
    barBack() {
      this.$navigateTo(Home, {
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
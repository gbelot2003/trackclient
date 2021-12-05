<template>
  <Page actionBarHidden="true" backgroundSpanUnderStatusBar="true" class="page">
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image class="logo" src="~/assets/images/logi_track.jpeg"></Image>
        <Label class="header" text="TrackingHn"></Label>
        <GridLayout rows="auto, auto, auto">
          <StackLayout row="0" class="input-field">
            <TextField
              class="input"
              hint="Email"
              keyboardType="email"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="email"
              returnKeyType="next"
              :isEnabled="!processing"
            ></TextField>
          </StackLayout>
z
          <StackLayout row="1" class="input-field">
            <TextField
              class="input"
              ref="password"
              hint="Password"
              secure="true"
              v-model="password"
              :isEnabled="!processing"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="2" v-show="!isLoggingIn" class="input-field">
            <TextField
              class="input"
              ref="confirmPassword"
              :isEnabled="!processing"
              hint="Confirm password"
              secure="true"
              v-model="confirmPassword"
              returnKeyType="done"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <ActivityIndicator rowSpan="3" :busy="processing"></ActivityIndicator>
        </GridLayout>

        <Button
          :text="isLoggingIn ? 'Log In' : 'Registrate'"
          :isEnabled="!processing"
          @tap="onButtonTap"
          class="btn btn-primary m-t-15"
        ></Button>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script >
import axios from 'axios/dist/axios'
import Home from './Home.vue'

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      processing: false,
      isLoggingIn: true,
    }
  },
  mounted() {
    if (this.is_logedIn) {
      this.$store.dispatch("AUTH_LOGOUT");
    }
  },
  computed: {
    is_logedIn() {
      return this.$store.getters.isLoggingIn;
    },
  },
  methods: {
    forgotPassword() {
      prompt({
        title: "¿Olvido su password?",
        message:
          "Ingrese el email que utilizo para regisrarse en la " +
          "aplicación para resetear su password",
        inputType: "email",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel",
      })
        .then((data) => {
          if (data.result) {
            alert("Esta funcionalidad esta pendiente de trabajo");
          }
        })
        .catch(() => {
          alert("Unfortunately, an error occurred resetting your password.");
        });
    },
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },

    onButtonTap() {

      if (!this.email || !this.password) {
        alert("Por favor, ingrese e-mail y/o contraseña para continuar!!.");
        return;
      }

      if (this.isLoggingIn) {
        const datas = {
          email: this.email,
          password: this.password,
        };

      this.$store.dispatch("AUTH_REQUEST", datas)
        .then((resp) => {
          if (resp.access_token){
            this.$store.dispatch("GET_USER").then(() => {
              this.processing = false;
              this.$navigateTo(Home, {
                trasition: {
                  name: "slide",
                  duration: 200,
                  curve: "ease",
                }
              })
            })
          } else {
            alert("Usuario y/o contraseña equivocados, prueba de nuevo!!.");
          }
        }).catch(err => {
          this.processing = false;
          alert("Usuario y/o contraseña equivocados, pruebe de nuevo!!.");
          console.log(err);
        })
      } else {
        alert("Esta funcionalidad esta pendiente de trabajo");
      }
    },
  }
}
</script>

<style scoped>
.page {
  align-items: center;
  flex-direction: column;
}
.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}
.logo {
  margin-bottom: 12;
  height: 90;
  font-weight: bold;
}
.header {
  horizontal-align: center;
  font-size: 20;
  font-weight: 600;
  margin-bottom: 40;
  text-align: center;
  color: #5a4ed5;
}
.input-field {
  margin-bottom: 15;
}
.input {
  font-size: 16;
  placeholder-color: #a8a8a8;
}
.input:disabled {
  background-color: white;
  opacity: 0.5;
}
.btn-primary {
  margin: 10 5 8 5;
}
.login-label {
  horizontal-align: center;
  color: #fffdfb;
  background-color: #000000;
  border-radius: 5;
  padding: 10;
  font-size: 10;
}
.sign-up-label {
  horizontal-align: center;
  color: #a8123c;
  background-color: #dae269;
  border-radius: 5;
  padding: 10;
  font-size: 10;
}
.bold {
  color: #000000;
}
</style>

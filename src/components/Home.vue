<template>
  <Page actionBarHidden="true" backgroundSpanUnderStatusBar="true" class="page">
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <GridLayout rows="auto, auto, auto">
          <StackLayout row="0">
            <Button :text="'Nuevo Paquete'"></Button>
          </StackLayout>

          <Label class="header" row="1" text="Dashboard"></Label>
          <Label class="header" row="2" text="Dashboard"></Label>
        </GridLayout>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {};
  },
};
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

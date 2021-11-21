<template>
  <Page>
    <StackLayout class="p-t-20">
      <Label class="header m-l-15 m-r-15" text="Operación Exitosa" />
      <label class="message m-l-15 m-r-15" text="¿Ir Nuevos Paquetes o Menu Principal?" />
      <StackLayout orientation="horizontal">
          <Button class="btn-primary" text="Continual" @tap="$modal.close('continuar')"/>
          <Button text="Menu Principal" @tap="$modal.close('salir')"/>
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<style>
    .message {
        color: red;
        font-weight: bold;
    }
</style>
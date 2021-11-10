<template>
  <Page loaded="pageLoaded">
    <ActionBar title="NativeScript-DrawingPad" />
    <Label>Print</Label>
    <GridLayout rows="auto, auto, auto">
      <StackLayout orientation="horizontal" row="0">
        <Button text="Obtener Imagen" @tap="getMyDrawing"></Button>
        <Button text="Limpiar" @tap="clearMyDrawing"></Button>
      </StackLayout>
      <ScrollView row="1">
        <StackLayout>
          <DrawingPad
            height="650"
            width="90%"
            id="drawingPad"
            ref="dibujo"
            penColor="#FF6B6B"
            penWidth="3"
            borderColor="black"
            borderWidth="1"
          >
          </DrawingPad>
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script>
import { Frame } from "ui/frame";
export default {
  data() {
    return {
      image: "",
    };
  },

  methods: {
    getMyDrawing() {
      this.$refs.dibujo._nativeView
        .getDrawingAsBase64("jpg")
        .then((res) => {
          console.log(res)
          this.image = res
        })
        .catch((err) => console.log(err));
    },

    clearMyDrawing() {
      const DrawingPad = Frame.topmost().getViewById("drawingPad");
      DrawingPad.clearDrawing();
    },
  },
};
</script>
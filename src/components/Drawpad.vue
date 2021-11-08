<template>
  <Page loaded="pageLoaded">
    <ActionBar title="NativeScript-DrawingPad" />
    <ScrollView>
        <Label text="Sign/Update below" textWrap="true" horizontalAlignment="center" verticalAlignment="center" marginTop="20"></Label>
      <StackLayout>

      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { topmost } from "ui/frame";
export default {
  data() {
    img: "";
  },

  methods: {
    getMyDrawing() {
      const DrawingPad = topmost().getViewById("myDrawingPad");
      DrawingPad.getDrawing().then((res) => {
        console.log(res);
      });
    },

    clearMyDrawing() {
      const DrawingPad = topmost().getViewById("myDrawingPad");
      DrawingPad.clearDrawing();
    },
  },
};
</script>
<template>
    <Page>
        <ActionBar title="Camera Tests FTW!"/>
        <StackLayout>
			<Button text="Take Picture" @tap="takePicture" />
			<Image :src="img" width="75" height="75" />
        </StackLayout>
    </Page>
</template>

<script>
const camera = require("@nativescript/camera");
import { Image } from "tns-core-modules/ui/image";
import * as imagepicker from "nativescript-imagepicker";

export default {
 data() {
		return {
			img:''
		}
	},
	methods:{
		takePicture() {
			camera.requestPermissions()
			.then(() => {
				camera.takePicture({ width: 600, height: 600, keepAspectRatio: true, saveToGallery:true })
				.then(imageAsset => {
					this.img = imageAsset;
				})
				.catch(e => {
					console.log('error:', e);
				});
			})
			.catch(e => {
				console.log('Error requesting permission');
			});
		}
	}
}
</script>            

<style scoped>
</style>

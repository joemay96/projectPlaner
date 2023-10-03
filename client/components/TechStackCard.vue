<script setup lang="ts">
const props = defineProps({
	name: String,
	area: String,
	imagePath: String,
})

const {name, area, imagePath} = props;

let imageUrl = ""
if(imagePath && imagePath != "") {
	imageUrl =  new URL(`../assets/images/tech/${imagePath}`, import.meta.url).href
} else {
	imageUrl =  new URL("../assets/images/tech/default.jpg", import.meta.url).href
}


</script>

<template>
	<div class="card card-compact max-w-md bg-base-100 shadow-xl">
		<figure><img :src="imageUrl" alt="TechStack" /></figure>
		<div class="card-body">
		  <h2 class="card-title">{{name}}</h2>
		  <p>{{ area }}</p>
		  <div class="card-actions justify-end">
			<button class="btn btn-error">Delete</button>
		  </div>
		</div>
	  </div>
</template>
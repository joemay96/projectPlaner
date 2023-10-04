<script setup lang="ts">
import client from "~/plugins/auth/client"

const props = defineProps({
	id: String,
	name: String,
	area: String,
	imagePath: String,
})

const {id, name, area, imagePath} = props;

let imageUrl = ""
if(imagePath && imagePath != "") {
	imageUrl = imagePath
} else {
	imageUrl =  new URL("../assets/images/tech/default.jpg", import.meta.url).href
}

function deleteTech() {
	try {
		client.deleteTechById(id)
	} catch (error) {
		console.log(error)
	}
}	

</script>

<template>
	<div class="card card-compact max-w-md bg-base-100 shadow-xl">
		<figure><img :src="imageUrl" alt="TechStack" /></figure>
		<div class="card-body">
		  <h2 class="card-title">{{name}}</h2>
		  <p>{{ area }}</p>
		  <div class="card-actions justify-end">
			<button class="btn btn-error" @click="deleteTech">Delete</button>
		  </div>
		</div>
	  </div>
</template>
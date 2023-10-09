<script setup lang="ts">
import client from "~/plugins/auth/client"

const emit = defineEmits(["editTech"])

const props = defineProps({
	id: String,
	name: String,
	area: String,
	imagePath: String,
	url: String,
})

const {id, name, area, imagePath, url=""} = props;

let imageUrl = ""
if(imagePath && imagePath != "" && imagePath.split("/").at(-1) != "") {
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

function searchTech() {
	if(url && url != "") {
		window.open(url, '_blank').focus();
	} else {
		window.open(`https://duckduckgo.com/?q=${name}&ia=web`, '_blank').focus();
	}
}

function editTechEmit() {
	emit("editTech", {
		id,
		name,
		area,
		imagePath,
		url,
	})
}

</script>

<template>
	<div class="card card-compact max-w-md bg-base-100 shadow-xl">
		<figure class="hover:cursor-pointer" @click="searchTech()"><img :src="imageUrl" alt="TechStack" /></figure>
		<div class="card-body">
		  <h2 class="card-title hover:cursor-pointer" @click="searchTech()">{{name}}</h2>
		  <p>{{ area }}</p>
		  <a v-if="url" :href="{url}" class="link link-secondary">{{ url }}</a>
		  <div class="card-actions justify-between">
			<button class="btn btn-warning" @click="editTechEmit">
				<Icon size="24px" name="mdi:pen" color="white" />
			</button>
			<button class="btn btn-error" @click="deleteTech">
				<Icon size="24px" name="fluent:delete-48-regular" color="white" />
			</button>
		  </div>
		</div>
	</div>
	<!-- <ModalsEditTech :id="id" :name="name" :area="area" :imagePath="imagePath" :url="url" /> -->
</template>
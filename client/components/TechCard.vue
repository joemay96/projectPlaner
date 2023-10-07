<script setup lang="ts">
const props = defineProps({
	name: String,
	id: String
})
const {name, id} = props;

const picValue = Math.floor(Math.random() * 4 + 1)

const imageUrl =  new URL(`../assets/images/tech/${picValue}.jpg`, import.meta.url).href

</script>

<template>
	<div class="card bg-base-300 shadow-xl "> <!-- image-full -->
		<!-- <figure><img :src="imageUrl" alt="TechStack" /></figure> -->
		<div class="card-body items-center text-center p-4">
			<!-- <NuxtLink to="/tech" class="text-lg font-bold hover:underline hover:cursor-pointer">{{name}}</NuxtLink> -->
			<div class="text-lg font-bold">{{name}}</div>
		</div>
	</div>
</template>
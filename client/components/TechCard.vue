<script setup lang="ts">
const props = defineProps({
	name: String
})
const {name} = props;

const picValue = Math.floor(Math.random() * 4 + 1)

const imageUrl =  new URL(`../assets/images/tech/${picValue}.jpg`, import.meta.url).href

</script>

<template>
	<div class="card bg-base-100 shadow-xl "> <!-- image-full -->
		<!-- <figure><img :src="imageUrl" alt="TechStack" /></figure> -->
		<div class="card-body items-center text-center p-4">
			<h2 class="text-lg font-bold">{{name}}</h2>
		</div>
	</div>
</template>
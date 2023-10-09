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
	<div class="card bg-base-100 shadow-xl border-2 border-accent  rounded-md cursor-default"> <!-- image-full hover:border-accent-focus -->
		<!-- <figure><img :src="imageUrl" alt="TechStack" /></figure> -->
		<div class="card-body items-center text-center p-2">
			<!-- <NuxtLink to="/tech" class="text-lg font-bold hover:underline hover:cursor-pointer">{{name}}</NuxtLink> -->
			<div class="">{{name}}</div>
		</div>
	</div>
</template>
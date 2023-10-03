<script setup lang="ts">
const props = defineProps({
	id: String,
	title: String,
	description: String,
	motivation: String,
	workEstimation: String,
	techStack: Array,
	tags: Array,
})

const {id, title, description, motivation, workEstimation, techStack, tags} = props;
</script>

<template>
	<div class="card bg-base-100 shadow-2xl">
		<!-- <figure><img src="../assets/images/tech/1.jpg" alt="Movie"/></figure> -->
		<div class="card-body">
			<h2 class="text-2xl font-bold text-primary text-center hover:text-primary-focus hover:underline"><NuxtLink :to="`/project/${id}`">{{ title }}</NuxtLink></h2>
			<!-- <div class="divider"><span class="font-bold">Description</span></div> -->
		  <p>{{description}}</p>
		  <div class="divider"><span class="font-bold">Motivation</span></div> 
		  <p> {{motivation}}</p>
		  <!-- <div class="divider"></div>  -->
		  <p><span class="font-bold">Work estimation:</span> {{workEstimation}}</p>
		  <h2 class="text-lg font-bold">Techstack:</h2>
		  <div class="flex flex-row gap-2 justify-center pt-[-12px]">
			<template v-for="t in techStack" :key="t" class="flex flex-col">
				<TechCard :name="t" />
			</template>
		  </div>
		  <div class="flex flex-row gap-2 mt-2 justify-center">
			<template v-for="tag, index in tags" :key="index">
				<div class="badge badge-md badge-primary">{{tag}}</div>
			</template>
		  </div>
		  <!-- <div class="card-actions justify-end">
			<button class="btn btn-primary">Inspect</button>
		  </div> -->
		</div>
	  </div>
</template>
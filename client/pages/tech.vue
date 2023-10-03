<script setup lang="ts">
import {techStack} from "../data/Techstack.js"
</script>

<template>
	<div class="flex justify-center">
		<h1 class="text-4xl text-secondary font-extrabold pb-8">Your Techstack</h1>
	</div>
	<div class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 px-8 md:px-20 flex-1 justify-around">
		<template v-for="t in techStack" key="p.id">
			<!-- @ts-ignore -->
			<TechStackCard :name="t.name" :area="t.area" :imagePath="t.imagePath || ''"/>
		</template>
	</div>
	<div class="mb-20"></div>
</template>
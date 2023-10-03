<script setup lang="ts">
import {projects} from "../data/Projects.js"
</script>

<template>
	<div class="flex justify-center">
		<h1 class="text-4xl text-secondary font-extrabold pb-8">Dashboard</h1>
	</div>
	<div class="grid grid-rows-2 grid-flow-col gap-4 px-20 flex-1 justify-around">
		<template v-for="p in projects" key="p.id">
			<!-- @ts-ignore -->
			<ProjectCard :id="p.id" :title="p.title" :description="p.description" :motivation="p.motivation" :workEstimation="p.workEstimation" :techStack="p.techStack" :tags="p.tags" />
		</template>
	</div>
	<div class="mb-20"></div>
</template>
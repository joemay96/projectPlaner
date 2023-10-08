<script setup lang="ts">
import client from "~/plugins/auth/client.js"
const route = useRoute();

definePageMeta({
  middleware: [
    'auth',
	"refresh-auth"
  ],
});

const projectId = route.params.id
const projectData = await client.getProjectById(projectId)
console.log(projectData)

</script>

<template>
	<div class="flex flex-col items-center">
		<h1>Project Template ID</h1>
		<p>{{projectData}}</p>
	</div>
</template>
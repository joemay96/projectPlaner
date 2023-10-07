<script setup lang="ts">
import client from "~/plugins/auth/client"

definePageMeta({
  middleware: [
    'auth',
  ],
});

let data: any = [];
let imgBasePath: String = `${client.getUrl()}/api/files`

try {
	data = await client.getTechList();
} catch (error) {
	// TODO: report error to user
	console.log(error)
}

</script>

<template>
	<div class="flex justify-center">
		<h1 class="text-4xl text-secondary font-extrabold pb-8">My Techstack</h1>
	</div>
	<div class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 px-8 md:px-20 flex-1 justify-around">
		<template v-for="t in data" key="p.id">
			<!--  An image path https://pocketbase.sharky.live/api/files/dngadhplinitltd/min84lwcz1uflh2/jsbjsxyBzhab_hvTlAvxbKa.png -->
			<!-- @ts-ignore -->
			<TechStackCard :id="t.id" :name="t.name" :area="t.area" :imagePath="`${imgBasePath}/${t.collectionId}/${t.id}/${t.image}` || ''"/>
		</template>
	</div>
	<div class="mb-20"></div>
</template>
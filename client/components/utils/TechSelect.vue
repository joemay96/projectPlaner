<script setup lang="ts">
import client from "~/plugins/auth/client"


// TODO: Emit event so that data is treversed back to the parent component
const emit = defineEmits(["techSelectChange"])


const selectedTech = ref([])

let data: any = [];

try {
	data = await client.getTechList();
} catch (error) {
	// TODO: report error to user
	console.log(error)
}

const techInput = ref()

function addTech() {
	//@ts-ignore
	selectedTech.value.push(techInput.value)
	techInput.value = ""
	transmitData();
}

function rmTag(index: number) {
	selectedTech.value.splice(index, 1)
	transmitData();
}
git
function transmitData() {
	emit("techSelectChange", selectedTech.value)
}

</script>

<template>
	<div>
		<div class="form-control w-full max-w-4xl">
			<label class="label">
			  <span class="label-text">Tech Stack*</span>
			</label>
			<select class="select select-bordered" @change="addTech()" v-model="techInput">
				<option disabled selected>Pick option</option>
				<template v-for="t, index in data" :key="index">
				  <option :value="t">{{ t.name }}</option>
				</template>
			</select>
		</div>
		<div class="flex flex-row justify-center pt-4">
			<template id="tagField" v-for="t, index in selectedTech" :key="index">
				<div class="badge gap-2 badge-lg">
					{{ t.name }}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current hover:cursor-pointer" @click="rmTag(index)">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</div>
			</template>
		</div>
	</div>
</template>
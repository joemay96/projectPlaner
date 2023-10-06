<script setup lang="ts">

// TODO: Emit event so that data is treversed back to the parent component

const emit = defineEmits(["tagChange"])

const tags = ref([])
const tagInput = ref("")

function addTag() {
	if(tagInput.value != "") {
		//@ts-ignore
		tags.value.push(tagInput.value)
		tagInput.value = ""
		tagChange()
	}
}

function rmTag(index: number) {
	tags.value.splice(index, 1)
	tagChange()
}

function tagChange() {
	emit("tagChange", tags.value)
}

</script>

<template>
	<div>
		<div class="flex justify-center gap-2 align-baseline">
			<div class="form-control w-full">
				<label class="label">
				  <span class="label-text">Tags*</span>
				</label>
				<input type="text" placeholder="Tag" class="input input-bordered w-full" v-model="tagInput" @keydown.enter="addTag()"/>
			</div>
			<button class="btn btn-primary mt-9" @click="addTag()" >Create Tag</button>
		</div>
		<div class="flex flex-row justify-center gap-1 py-4">
			<template id="tagField" v-for="t, index in tags" :key="index">
				<div class="badge gap-2">
					{{ t }}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current hover:cursor-pointer" @click="rmTag(index)">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</div>
			</template>
		</div>
	</div>
</template>
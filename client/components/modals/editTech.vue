<script setup lang="ts">
import client from "~/plugins/auth/client.js"
import {isValidHttpUrl} from "~/plugins/utils/valFuncs.js"

const props = defineProps({
	id: ref(),
	userid: String,
	name: String,
	area: String,
	imagePath: String,
	url: String,
})

const {id, userid, name, area, imagePath, url} = props;
const refProps = toRefs(props);

watch(refProps.id, (newVal, oldVal) => {
	newTech.id = refProps.id.value;
	newTech.name = refProps.name.value;
	newTech.area = refProps.area.value;
	newTech.image = refProps.imagePath.value;
	newTech.url = refProps.url.value;
}, {deep:true})

type tech =  {
	userid: String,
	name: String,
	area: String,
	image: File | null,
	url: String | undefined,
}

let newTech: tech = {
	id: id,
	userid: userid,
	name: name,
	area: area,
	image: imagePath,
	url: url,
}

function onFileChange(e: any) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length)
    return;
  newTech.image = files[0];
  updatePicture(files[0]);
}

function updatePicture(file) {
	let reader = new FileReader();
	reader.onload = function(e) {
		const profileImage = document.getElementById("techImage")
		profileImage.src = e.target.result;
	}
	reader.readAsDataURL(file)
}

// save the data to pocketbase
async function updateTech() {
	if(newTech.name === "") {
		// TODO: mache Error erkennbar
		console.error("Name can not be empty")
		return
	}

	if(!isValidHttpUrl(newTech.url) && newTech.url !== "") {
		console.error("Not a valid url")
		return
	}
	
	try {
		const res = await client.updateTechById(newTech.id, newTech);
		edit_tech_modal.close()
		// TODO: send a refetch event to /tech
		console.log(res);
	} catch (error) {
		console.error(error)
	}
}

</script>

<template>
<dialog id="edit_tech_modal" class="modal">
	<div class="modal-box w-11/12 max-w-xl">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> 
		</form>
		<h3 class="font-bold text-xl">Tech edit of <span class="text-accent">{{ refProps.name.value }}</span></h3>
		<div class="modal-action">
		<!-- <form method="dialog"> -->
			<div class="w-full flex flex-col">
				<div class="form-control w-full max-w-2xl">
					<label class="label">
					<span class="label-text">Tech name</span>
					</label>
					<input type="text" placeholder="Name" class="input input-bordered w-full max-w-2xl" v-model="newTech.name" />
				</div>
				<div class="form-control w-full max-w-2xl">
					<label class="label">
					<span class="label-text">Area</span>
					</label>
					<input type="text" placeholder="Tech area e.p. Backend, Frontend etc." class="input input-bordered w-full max-w-2xl" v-model="newTech.area" />
				</div>
				<div class="form-control w-full max-w-2xl">
					<label class="label">
					<span class="label-text">Url to Techsite</span>
					</label>
					<input type="url" placeholder="https://projectplaner.io/" class="input input-bordered w-full max-w-2xl" v-model="newTech.url" />
				</div>
				<div class="w-full flex justify-center items-center mt-4">
					<img :src="newTech.image" class="w-56 rounded-xl" id="techImage" />
				</div>
				<div class="form-control">
					<label class="label pb-0">
						<span class="label-text">Change Picture</span>
					</label>
					<input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs my-4" v-on:change="onFileChange" />
				</div> 
				<button class="btn btn-warning max-w-2xl" @click="updateTech">Update</button>
			</div>
		<!-- </form> -->
		</div>
	</div>
</dialog>
</template>
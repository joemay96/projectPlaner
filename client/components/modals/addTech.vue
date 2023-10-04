<script setup lang="ts">
import client from '~/plugins/auth/client';

type tech =  {
	name: String,
	area: String,
	image: File | null,
}

let newTech: tech = {
	name: "",
	area: "",
	image: null
}

function onFileChange(e: any) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length)
    return;
  newTech.image = files[0];
}

// save the data to pocketbase
async function saveTech() {
	if(newTech.name === "") {
		// TODO: mache Error erkennbar
		return
	}
	
	try {
		const res = await client.createTech(newTech);
		console.log(res)
	} catch (error) {
		console.log(error)
	}
}

</script>

<template>
<dialog id="add_tech_modal" class="modal">
  <div class="modal-box w-11/12 max-w-2xl">
    <h3 class="font-bold text-xl">Tech</h3>
    <p class="pt-4">Add a new Technology to your Stack. 
		<div class="tooltip tooltip-bottom tooltip-primary" data-tip="
		You can here create a new Tech which you can specify in your projects page. Only required is a name but you can also specify an area and a picture for identification purposes.
		">
			<Icon name="fluent:info-48-regular" color="black" />
		</div>
	</p>
    <div class="modal-action">
      <!-- <form method="dialog"> -->
		<div class="w-full flex flex-col">
			<div class="form-control w-full max-w-2xl">
				<label class="label">
				<span class="label-text">Tech name*</span>
				</label>
				<input type="text" placeholder="Name" class="input input-bordered w-full max-w-2xl" v-model="newTech.name" />
			</div>
			<div class="form-control w-full max-w-2xl">
				<label class="label">
				<span class="label-text">Area</span>
				</label>
				<input type="text" placeholder="Tech area e.p. Backend, Frontend etc." class="input input-bordered w-full max-w-2xl" v-model="newTech.area" />
			</div>
			<div class="form-control">
				<label class="label pb-0">
					<span class="label-text">Photo</span>
				</label>
				<input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs my-4" v-on:change="onFileChange" />
			</div> 
			<button class="btn btn-success max-w-2xl" @click="saveTech">Save</button>
		</div>
      <!-- </form> -->
    </div>
  </div>
</dialog>
</template>
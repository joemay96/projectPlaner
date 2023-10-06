<script setup lang="ts">
import client from '~/plugins/auth/client';
// const workEstimation = [
	// "Small (few days)",
	// "Medium (few weeks)",
	// "Long (few months)",
	// "Very long (many months to years)"
// ]
const workEstimationValues: String[] = [
	"Small",
	"Medium",
	"Long",
	"Very long",
]

type project =  {
	userid: String,
	title: String,
	description: string | number | string[] | undefined,
	motivation: string | number | string[] | undefined,
	workEstimation: String,
	techStack: [String],
	tags: [String],
}

const user = client.getUserLS();

let newProject: project = {
	userid: user.id,
	title: "",
	description: "",
	motivation: "",
	workEstimation: workEstimationValues[0],
	techStack: [""],
	tags: [""],
}

function techDataChange(techData: [String]) {
	newProject.techStack = techData;
}

function tagDataChange(tagData: [String]) {
	newProject.tags = tagData;
}

function saveProject() {
	console.log(newProject)
	if(!newProject || newProject.title == "") {
		// TODO: emit error to user
		console.error("Title of the project can't be empty")
		return
	}
	if(newProject.description == "") {
		console.error("Description can not be empty")
		return
	}
	client.createProject(newProject)
	// add_project_model.checked = false;
}

</script>

<template>
<dialog id="add_project_modal" class="modal">
  <div class="modal-box w-11/12 max-w-4xl">
    <h3 class="font-bold text-xl">New Project 
		<div class="tooltip tooltip-bottom tooltip-primary" data-tip="
		Here you can create a new Project. At least the title and the description are necessary for information.
		">
			<Icon name="fluent:info-48-regular" color="black" />
		</div>
	</h3>
    <p class="pt-4">Create a new project 
		
	</p>
    <div class="modal-action">
      <!-- <form method="dialog"> -->
		<div class="w-full flex flex-col">
			<div class="form-control w-full max-w-4xl">
				<label class="label">
				<span class="label-text">Title</span>
				</label>
				<input type="text" placeholder="Title" class="input input-bordered w-full max-w-4xl" v-model="newProject.title" />
			</div>
			<div class="form-control">
				<label class="label">
				  <span class="label-text">Desription</span>
				</label>
				<textarea class="textarea textarea-bordered h-24" placeholder="A desription fo your project" v-model="newProject.description"></textarea>
			</div>
			<div class="form-control">
				<label class="label">
				  <span class="label-text">Motivation*</span>
				</label>
				<textarea class="textarea textarea-bordered h-16" placeholder="Say what motivates you for this project." v-model="newProject.motivation"></textarea>
			</div>
			<div class="form-control w-full max-w-4xl">
				<label class="label">
				  <span class="label-text">Work estimation*</span>
				</label>
				<select class="select select-bordered" v-model="newProject.workEstimation">
				  <option disabled selected>Pick one</option>
				  <template v-for="w, index in workEstimationValues" :key="index">
					<option>{{ w }}</option>
				  </template>
				</select>
			</div>
			<UtilsTechSelect @techSelectChange="techDataChange" />
			<UtilsTagCreation @tagChange="tagDataChange" />
			<!-- <div class="form-control">
				<label class="label pb-0">
					<span class="label-text">Photo</span>
				</label>
				<input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs my-4" />
			</div>  -->
			<button class="btn btn-success max-w-4xl" @click="saveProject()">Save</button>
		</div>
      <!-- </form> -->
    </div>
  </div>
</dialog>
</template>
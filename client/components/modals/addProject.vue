<script setup lang="ts">
const workEstimation = [
	"Small (few days)",
	"Medium (few weeks)",
	"Long (few months)",
	"Very long (many months to years)"
]

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
				<input type="text" placeholder="Title" class="input input-bordered w-full max-w-4xl" />
			</div>
			<div class="form-control">
				<label class="label">
				  <span class="label-text">Desription</span>
				</label>
				<textarea class="textarea textarea-bordered h-24" placeholder="A desription fo your project"></textarea>
			</div>
			<div class="form-control">
				<label class="label">
				  <span class="label-text">Motivation*</span>
				</label>
				<textarea class="textarea textarea-bordered h-16" placeholder="Say what motivates you for this project."></textarea>
			</div>
			<div class="form-control w-full max-w-4xl">
				<label class="label">
				  <span class="label-text">Work estimation*</span>
				</label>
				<select class="select select-bordered">
				  <option disabled selected>Pick one</option>
				  <template v-for="w, index in workEstimation" :key="index">
					<option>{{ w }}</option>
				  </template>
				</select>
			</div>
			<UtilsTechSelect />
			<UtilsTagCreation />
			<!-- <div class="form-control">
				<label class="label pb-0">
					<span class="label-text">Photo</span>
				</label>
				<input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs my-4" />
			</div>  -->
			<button class="btn btn-success max-w-4xl">Save</button>
		</div>
      <!-- </form> -->
    </div>
  </div>
</dialog>
</template>
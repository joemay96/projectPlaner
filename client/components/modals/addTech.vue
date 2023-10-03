<script setup lang="ts">

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
				<input type="text" placeholder="Name" class="input input-bordered w-full max-w-2xl" />
			</div>
			<div class="form-control w-full max-w-2xl">
				<label class="label">
				<span class="label-text">Area</span>
				</label>
				<input type="text" placeholder="Tech area e.p. Backend, Frontend etc." class="input input-bordered w-full max-w-2xl" />
			</div>
			<div class="form-control">
				<label class="label pb-0">
					<span class="label-text">Photo</span>
				</label>
				<input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs my-4" />
			</div> 
			<button class="btn btn-success max-w-2xl">Save</button>
		</div>
      <!-- </form> -->
    </div>
  </div>
</dialog>
</template>
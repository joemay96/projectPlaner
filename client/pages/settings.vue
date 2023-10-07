<script setup lang="ts">
import client from "~/plugins/auth/client.js"

definePageMeta({
  middleware: [
    'auth',
  ],
});

const user = client.getUserLS();

let updateUser = {
	username: "",
	password: "",
	email: "",
	profileImage: null,
}

function profilePictureChange(e: any) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length)
    return;
  updateUser.profileImage = files[0];
}

let imgUrl = "";
if(user) {
  imgUrl = `${client.getUrl()}/api/files/_pb_users_auth_/${user.id}/${user.imagePath}`;
}

</script>

<template>
	<div class="flex justify-center">
		<h1 class="text-4xl text-secondary font-extrabold pb-8">Settings</h1>
	</div>
	<div class="flex flex-col items-center mb-12">
		<div class="flex flex-row justify-center">
			<div class="w-96 mask mask-hexagon-2 mt-12">
				<img :src="imgUrl" class=""/>
			</div>
			<label 
				for="changeProfilePicture" 
				class="self-end ml-[-100px] hover:cursor-pointer z-10"
				@click="changeProfilePicture"
			>
				<Icon name="mdi:account-circle" size="56px" color="white" class="" />
			</label>
			<input id="changeProfilePicture" type="file" class="hidden" v-on:change="profilePictureChange" />
		</div>
		<div class="w-full flex flex-col items-center mt-6">
			<div class="form-control w-full max-w-lg mb-4">
				<label class="label">
				<span class="label-text">Change Password</span>
				</label>
				<input type="password" placeholder="********" class="input input-bordered w-full max-w-lg" v-model="updateUser.email" />
			</div>
			<div class="form-control w-full max-w-lg mb-4">
				<p class="mb-1"><span>Current Username: </span>
					{{ user.username }}
				</p>
				<!-- <label class="label"> -->
				<!-- <span class="label-text">Change Username</span> -->
				<!-- </label> -->
				<input type="text" placeholder="Change username" class="input input-bordered w-full max-w-lg" v-model="updateUser.username" />
			</div>
			<div class="form-control w-full max-w-lg mb-4">
				<p class="mb-1"><span>Current email:</span>
				{{user.email}}
				</p>
				<!-- <label class="label"> -->
				<!-- <span class="label-text">Change email</span> -->
				<!-- </label> -->
				<input type="email" placeholder="Change email" class="input input-bordered w-full max-w-lg" v-model="updateUser.email" />
			</div>
			<button class="btn btn-success max-w-xs" @click="saveTech">Save</button>
		</div>
	</div>
</template>
<script setup lang="ts">
// const route = useRoute();
import client from "../../plugins/auth/client.js";

const user = client.getUserLS();
let imgUrl = "";
if(user) {
  imgUrl = `${client.getUrl()}/api/files/_pb_users_auth_/${user.id}/${user.imagePath}`;
}

</script>

<template>
	<div class="drawer z-50 w-12 mx-2">
		<!-- drawer input is in the AppHeader -->
		<input id="sidebar" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content w-12">
			<label for="sidebar" class="btn btn-square btn-ghost">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
			</label>
			<!-- <slot /> -->
		</div> 
		<div class="drawer-side z-50">
			<label for="sidebar" class="drawer-overlay"></label>
			<ul class="flex items-center menu h-screen overflow-y-auto w-80 bg-base-100 text-base-content mb-1">
				<div class="mt-16 w-40 mask mask-hexagon-2">
					<img :src="imgUrl" class="mb-4"/>
				</div>
				<li><button class="btn btn-wide btn-secondary mb-10 pt-4" onclick="add_project_modal.showModal()">Create new Project</button></li>
				<p class="mb-10">{{user.email}}</p>
				<!-- Sidebar content here -->
				<li><extensionsSidebarNuxtLink to ="/" class="btn btn-wide mb-1 btn-ghost pt-4">Dashboard</extensionsSidebarNuxtLink></li>
				<li><extensionsSidebarNuxtLink to="/tech" class="btn-ghost btn btn-wide pt-4 mb-1">
					Techstack
				</extensionsSidebarNuxtLink></li>
				<li><button class="btn btn-wide mb-1 btn-ghost pt-4" onclick="add_tech_modal.showModal()">Add Tech</button></li>
				<li><extensionsSidebarNuxtLink to="/settings" class="btn-ghost btn btn-wide pt-4 mt-12">
					Settings
				</extensionsSidebarNuxtLink></li>
			</ul>
		</div>
	</div>
	<ModalsAddProject />
	<ModalsAddTech />
</template>

<style>
.activeLink {
    --tw-border-opacity: 1;
    border-color: hsl(var(--p) / var(--tw-border-opacity));
    --tw-bg-opacity: 1;
    background-color: hsl(var(--p) / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: hsl(var(--pc) / var(--tw-text-opacity));
}
</style>
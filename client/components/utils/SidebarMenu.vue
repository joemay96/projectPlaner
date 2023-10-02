<script setup lang="ts">
// const route = useRoute();

</script>

<template>
	<div class="drawer">
		<!-- drawer input is in the AppHeader -->
		<input id="sidebar" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<slot />
		</div> 
		<div class="drawer-side">
			<label for="sidebar" class="drawer-overlay"></label>
			<ul class="flex items-center menu overflow-y-auto w-80 bg-base-100 text-base-content mb-1">
				<div class="mt-16 w-40 mask mask-hexagon-2">
					<img src="../../assets/images/profile.jpeg" class="mb-4"/>
				</div>
				<li><NuxtLink to ="/" class="btn btn-wide btn-secondary mb-10">Create CV</NuxtLink></li>
				<!-- <p class="mb-10">{{user.email}}</p> -->
				<!-- Sidebar content here -->
				<!-- <li><extensionsSidebarNuxtLink to ="/user" class="btn btn-wide mb-1 btn-ghost">Dashboard</extensionsSidebarNuxtLink></li>
				<li><extensionsSidebarNuxtLink to ="/user/cv" class="btn btn-wide mb-1 btn-ghost">Manage CVs</extensionsSidebarNuxtLink></li>
				<li><extensionsSidebarNuxtLink to="/user/letter" class="btn btn-wide mb-1 btn-ghost">Manage Letters</extensionsSidebarNuxtLink></li>
				<li><extensionsSidebarNuxtLink to="/user/order" class="btn-ghost btn btn-wide rounded-lg">
					Your Orders
					<span class="badge">New</span>
				</extensionsSidebarNuxtLink></li> -->
			</ul>
		</div>
	</div>
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
<script setup lang="ts">

</script>

<template>		
<div class="dropdown dropdown-end dropdown-hover">
 	<label tabindex="0" class="flex">
		Menu
		<svg class="mt-0.5 fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
	</label>
  <ul tabindex="0" class="mt-64 ml-12 dropdown-content menu p-2 menu-compact shadow bg-base-100 rounded-box w-48">
    <li>
			<extensionsSidebarNuxtLink to="/">
				Dashboard
			</extensionsSidebarNuxtLink>
		</li>
		<!-- <li>
			<extensionsSidebarNuxtLink to="/user/editor">
				CV Creator
			</extensionsSidebarNuxtLink>
		</li>
		<li>
			<extensionsSidebarNuxtLink to="/user/cv">
				Manage CVs
			</extensionsSidebarNuxtLink>
		</li>
		<li>
			<extensionsSidebarNuxtLink to="/user/letter">
				Manage letters
			</extensionsSidebarNuxtLink>
		</li>
		<li>
			<extensionsSidebarNuxtLink to="/user/order">
				Orders
				<span class="badge">New</span>
			</extensionsSidebarNuxtLink>
		</li> -->
  </ul>
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
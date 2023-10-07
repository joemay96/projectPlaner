import { UtilsAppContainer } from '../.nuxt/components';
<script setup lang="ts">
definePageMeta({
  middleware: [
    'auth',
  ],
});
</script>

<template>
	<div class="flex justify-center">
		<h1 class="text-4xl text-secondary font-extrabold pb-8">Settings</h1>
	</div>
	<div class="flex flex-col items-center">
		Update:
		<ul>
			<li>Change password</li>
			<li>Username</li>
			<li>Email</li>
			<li>Profile Foto</li>
		</ul>
	</div>
</template>
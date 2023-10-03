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
</template>
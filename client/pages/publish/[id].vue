<script setup lang="ts">
definePageMeta({
    middleware: ['no-auth'],
    layout: 'public',
});
</script>

<template>
    <h1 class="title">
        This is the publish site that can be shared with others.
    </h1>
    <p>Also people can have a profile to add.</p>
</template>

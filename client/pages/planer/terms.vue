<script setup lang="ts">
definePageMeta({
    middleware: ['no-auth'],
    layout: 'public',
});

function saveProfile() {
    console.log('Save Profile');
    // store.saveProfile(profile);
}
</script>

<template>
    <h1>This is the Terms Page</h1>
</template>

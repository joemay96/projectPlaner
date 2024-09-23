<script setup lang="ts">
// const techStore = useTech();
// const projectStore = useProject();
const route = useRoute();

definePageMeta({
    middleware: ['no-auth'],
});

const id = route.params.id;
console.log(id);
// const pj = ref(projectStore.getProjectById(projectId));
// TODO: get the userprofile by the provided username or userid
</script>

<template>
    <h1 class="title">This is the user profile page {{ id }}.</h1>
</template>

<script setup lang="ts">
// const techStore = useTech();
// const projectStore = useProject();
const route = useRoute();

definePageMeta({
    middleware: ['no-auth'],
});

const id = route.params.id;
const name = route.params.name;
console.log(id, name);
// const pj = ref(projectStore.getProjectById(projectId));
// TODO: get the userprofile by the provided username or userid
const record = await pb
    .collection('pp_userinfo')
    .getFirstListItem('someField="test"', {
        expand: 'relField1,relField2.subRelField',
    });
</script>

<template>
    <h1 class="title">This is the user profile page {{ name }} {{ id }}.</h1>
</template>

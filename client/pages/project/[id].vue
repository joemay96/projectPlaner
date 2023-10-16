<script setup lang="ts">
import client from '~/plugins/auth/client.js';
const route = useRoute();

definePageMeta({
    middleware: ['auth'],
});

const projectId = route.params.id;
const pj = await client.getProjectById(projectId);
const fullTechList = await client.getTechList();
</script>

<template>
    <div class="flex flex-col items-center">
        <ProjectDisplay
            :id="pj.id"
            :userid="pj.userid"
            :title="pj.title"
            :description="pj.description"
            :motivation="pj.motivation"
            :workEstimation="pj.workEstimation"
            :tags="pj.tags"
            :techStack="pj.techStack"
            :fullTechList="fullTechList"
            :created="new Date(pj.created)"
            :updated="new Date(pj.updated)"
        />
    </div>
</template>

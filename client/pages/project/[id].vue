<script setup lang="ts">
import client from '~/plugins/auth/client.js';
const route = useRoute();

definePageMeta({
    middleware: ['auth', 'refresh-auth'],
});

const projectId = route.params.id;
const pj = await client.getProjectById(projectId);
const fullTechList = await client.getTechList();
console.log(pj);
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
        <!-- <h1>Project Template ID</h1>
        <div class="divider"></div>
        <p class="my-2">
            {{ projectData.title }} | id: {{ projectData.id }} | userid:
            {{ projectData.userid }}
        </p>
        <p class="my-2">Description: {{ projectData.description }}</p>
        <p class="my-2">created: {{ projectData.created }}</p>
        <p class="my-2">updated: {{ projectData.updated }}</p>
        <p class="my-2">Motivation: {{ projectData.motivation }}</p>
        <p class="my-2">Tags: {{ projectData.tags }}</p>
        <p class="my-2">TechStack: {{ projectData.techStack }}</p>
        <p class="my-2">Work estimation: {{ projectData.workEstimation }}</p> -->
    </div>
</template>

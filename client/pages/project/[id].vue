<script setup lang="ts">
const techStore = useTech();
const projectStore = useProject();
const route = useRoute();

definePageMeta({
    middleware: ['auth'],
});

const projectId = route.params.id;
const pj = ref(projectStore.getProjectById(projectId));
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
            :fullTechList="techStore.getTechs"
            :created="new Date(pj.created)"
            :updated="new Date(pj.updated)"
        />
    </div>
</template>

<script setup lang="ts">
const techStore = useTech();
const projectStore = useProject();
const route = useRoute();

definePageMeta({
    middleware: ['auth'],
    layout: 'default',
});

const projectId = route.params.id;
const pj = ref(projectStore.getProjectById(projectId));
</script>

<template>
    <!-- TODO: here has to be some info about the person, maybe the option to go back etc. -->
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
            :github="pj.githubLink"
        />
    </div>
</template>

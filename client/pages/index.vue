<script setup lang="ts">
const techStore = useTech();
const projectStore = useProject();

definePageMeta({
    middleware: ['auth'],
});


</script>

<template>
    <main>
        <div class="flex justify-center">
            <h1 class="text-4xl text-secondary font-extrabold pb-8">
                Dashboard
            </h1>
        </div>
        <div
            class="grid grid-cols-1 xl:grid-cols-2 gap-4 px-20 flex-1 justify-around"
            v-auto-animate
        >
            <template v-for="p in projectStore.getProjects" :key="p.id">
                <ProjectCard
                    :id="p.id"
                    :title="p.title"
                    :description="p.description"
                    :motivation="p.motivation"
                    :workEstimation="p.workEstimation"
                    :techStack="p.techStack"
                    :tags="p.tags"
                    :fullTechList="techStore.getTechs"
                />
            </template>
        </div>
        <div class="mb-20"></div>
    </main>
</template>

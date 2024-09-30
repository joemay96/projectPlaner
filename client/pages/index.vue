<script setup lang="ts">
const techStore = useTech();
const projectStore = useProject();

definePageMeta({
    middleware: ['no-auth'],
});

let first = true;
</script>

<template>
    <main>
        <div class="flex justify-center">
            <h1 class="text-4xl text-secondary font-extrabold pb-8">
                Dashboard
            </h1>
        </div>
        <div
            class="grid grid-cols-1 gap-4 mx-auto px-2 flex-1 justify-around max-w-6xl"
            v-auto-animate
        >
            <template
                v-for="(p, index) in projectStore.getProjects"
                :key="p.id"
            >
                <div class="collapse collapse-arrow bg-base-200">
                    <template v-if="index != '0'">
                        <input type="radio" name="my-accordion-2" />
                    </template>
                    <template v-else>
                        <input type="radio" name="my-accordion-2" checked />
                    </template>
                    <div class="collapse-title text-xl font-medium">
                        {{ p.title }}
                    </div>
                    <div class="collapse-content">
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
                    </div>
                </div>
            </template>
        </div>
        <div class="mb-20"></div>
    </main>
</template>

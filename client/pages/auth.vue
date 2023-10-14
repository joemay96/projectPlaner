<script setup lang="ts">
import { projects } from '../data/TitleProjects.js';

definePageMeta({
    middleware: ['no-auth'],
});

if (window.innerHeight > 1100) {
}
</script>

<template>
    <main class="overflow-hidden">
        <div class="flex justify-center">
            <h1 class="text-4xl text-secondary font-extrabold pb-8">
                PrivateProjectPlaner
            </h1>
        </div>
        <div
            class="grid grid-flow-col gap-4 px-20 flex-1 justify-around grid-rows-4 grid-cols-1 lg:grid-cols-2 lg:grid-rows-2"
        >
            <template v-for="p in projects" key="p.id">
                <!-- @ts-ignore -->
                <AuthProjectCard
                    :id="p.id"
                    :title="p.title"
                    :description="p.description"
                    :motivation="p.motivation"
                    :workEstimation="p.workEstimation"
                    :techStack="p.techStack"
                    :tags="p.tags"
                    :auth="true"
                />
            </template>
        </div>
        <div class="mb-20"></div>
    </main>
</template>

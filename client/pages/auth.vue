<script setup lang="ts">
import { projects } from '../data/TitleProjects.js';

definePageMeta({
    middleware: ['no-auth'],
    layout: 'public',
});
</script>

<template>
    <Hero class="mb-10" />
    <main class="overflow-hidden">
        <div
            class="grid grid-cols-1 gap-4 mx-auto px-2 flex-1 justify-around max-w-6xl"
            v-auto-animate
        >
            <template v-for="p in projects" :key="p.id">
                <div class="collapse collapse-arrow bg-base-200">
                    <template v-if="p.id == '1'">
                        <input
                            type="radio"
                            name="my-accordion-2"
                            checked="checked"
                        />
                    </template>
                    <template v-else>
                        <input type="radio" name="my-accordion-2" />
                    </template>
                    <div class="collapse-title text-xl font-medium">
                        {{ p.title }}
                    </div>
                    <div class="collapse-content">
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
                    </div>
                </div>
            </template>
        </div>
        <div class="mb-20"></div>
    </main>
</template>

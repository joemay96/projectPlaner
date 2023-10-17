<script setup lang="ts">
import client from '~/plugins/auth/client';
// import {projects} from "../data/Projects.js"
definePageMeta({
    middleware: ['auth'],
});

let projectData: any = [];
let techData: any = [];

try {
    const data = await client.getProjectList();
    projectData = data.items;
    const tData = await client.getTechList();
    techData = tData;
} catch (error) {
    // TODO: report error to user
    console.error(error);
}

// async function getTechData(techStackIdList) {
// 	const techStack: any = [];
// 	techStackIdList.forEach(id => {
// 		const tech = await client.getTechById(id);
// 		techStack.push(tech);
// 	})
// 	return techStack;
// }
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
            <template v-for="p in projectData" key="p.id">
                <!-- @ts-ignore -->
                <ProjectCard
                    :id="p.id"
                    :title="p.title"
                    :description="p.description"
                    :motivation="p.motivation"
                    :workEstimation="p.workEstimation"
                    :techStack="p.techStack"
                    :tags="p.tags"
                    :fullTechList="techData"
                />
            </template>
        </div>
        <div class="mb-20"></div>
    </main>
</template>

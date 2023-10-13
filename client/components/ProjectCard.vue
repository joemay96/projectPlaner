<script setup lang="ts">
import client from '~/plugins/auth/client.js';

const props = defineProps({
    id: String,
    title: String,
    description: String,
    motivation: String,
    workEstimation: String,
    techStack: Array,
    tags: String,
    fullTechList: Array,
});

const {
    id,
    title,
    description,
    motivation,
    workEstimation,
    techStack,
    tags,
    fullTechList,
} = props;

const techList: any = [];
techStack.forEach(techId => {
    techList.push(fullTechList.filter(item => item.id === techId)[0]);
});

const tagList = tags.split(',');

async function deleteProject() {
    try {
        const res = await client.deleteProjectById(id);
        console.log(res);
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <div class="card bg-base-100 shadow-2xl">
        <!-- <figure><img src="../assets/images/tech/1.jpg" alt="Movie"/></figure> -->
        <div class="card-body">
            <div class="flex flex-row justify-between">
                <div class="">
                    <h2
                        class="text-2xl font-bold text-primary hover:text-primary-focus hover:underline mb-4"
                    >
                        <NuxtLink :to="`/project/${id}`">{{ title }}</NuxtLink>
                    </h2>
                    <p class="">
                        <span class="">Work estimation: </span
                        >{{ workEstimation }}
                    </p>
                </div>
                <div class="flex flex-col gap-1 justify-center">
                    <template v-for="(tag, index) in tagList" :key="index">
                        <div
                            v-if="tag != ''"
                            class="badge badge-md badge-accent"
                        >
                            {{ tag }}
                        </div>
                    </template>
                </div>
            </div>
            <div class="divider mb-0">
                <span class="font-bold">Description</span>
            </div>
            <p>{{ description }}</p>
            <div class="divider mb-0">
                <span class="font-bold">Motivation</span>
            </div>
            <p>{{ motivation }}</p>
            <div class="divider mb-1">
                <span class="font-bold">Tech Stack</span>
            </div>
            <div class="flex flex-row gap-2 justify-center">
                <template v-for="t in techList" :key="t" class="flex flex-col">
                    <TechCard :name="t.name" :id="t.id" />
                </template>
            </div>
            <!-- <div class="card-actions justify-end">
			<button class="btn btn-error p-2" @click="deleteProject()">
				<Icon name="mdi:delete" color="white" class="font-bold" size="28px" />
			</button>
		  </div> -->
        </div>
    </div>
</template>

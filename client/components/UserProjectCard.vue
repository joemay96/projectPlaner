<script setup lang="ts">
const props = defineProps({
    id: { type: String },
    title: String,
    description: String,
    motivation: String,
    techStack: Array,
    tags: String,
});

const { id, title, description, motivation, techStack, tags } = props;

// const techList: any = [];
// techStack?.forEach(techId => {
//     techList.push(fullTechList?.filter((item: any) => item.id === techId)[0]);
// });

const tagList = tags?.split(',');

// async function deleteProject() {
//     try {
//         const res = await $client.deleteProjectById(id);
//         console.log(res);
//     } catch (error) {
//         console.error(error);
//     }
// }
</script>

<template>
    <div class="card bg-base-200 shadow-2xl">
        <!-- <figure><img src="../assets/images/tech/1.jpg" alt="Movie"/></figure> -->
        <div class="card-body">
            <div class="flex flex-col">
                <h2
                    class="text-2xl font-bold text-primary hover:text-primary-focus hover:underline mb-4"
                >
                    <NuxtLink :to="`/project/${id}`">{{ title }}</NuxtLink>
                </h2>
                <div class="flex flex-col gap-1 justify-center">
                    <template v-for="(tag, index) in tagList" :key="index">
                        <div
                            v-if="tag != ''"
                            class="badge badge-accent min-w-32"
                        >
                            <span v-if="tag.length >= 14" class=""
                                >{{ tag.substr(0, 14) }}...</span
                            >
                            <span v-else>{{ tag }}</span>
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
            <!-- <div class="flex flex-row gap-2 justify-center">
                <template v-for="t in techList" :key="t" class="flex flex-col">
                    <TechCard :name="t.name" :id="t.id" />
                </template>
            </div> -->
        </div>
    </div>
</template>

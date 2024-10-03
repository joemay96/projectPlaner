<script setup lang="ts">
const props = defineProps({
    id: { type: String },
    userid: { type: String },
    title: String,
    description: String,
    motivation: String,
    techStack: Array,
    fullTechList: Array,
    tags: String,
});

const {
    id,
    userid,
    title,
    description = '',
    motivation,
    techStack,
    tags,
    fullTechList,
} = props;

const tagList = tags?.split(',');
</script>

<template>
    <!-- TODO: change the stlye of the project card a little bit -->
    <div class="card bg-base-200 shadow-2xl">
        <div class="card-body">
            <div class="flex flex-col">
                <h2
                    class="text-2xl font-bold text-primary hover:text-primary-focus hover:underline"
                >
                    <NuxtLink :to="`/user/${userid}/${id}`">{{
                        title
                    }}</NuxtLink>
                </h2>
                <!-- <div class="flex flex-col gap-1 justify-center">
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
                </div> -->
            </div>
            <div class="divider mb-0">
                <span class="font-bold">Description</span>
            </div>
            <template v-if="description.length > 125">
                <p>{{ description.slice(0, 125) }}...</p>
            </template>
            <template v-else>
                <p>{{ description }}</p>
            </template>
            <div class="divider mb-1">
                <span class="font-bold">Tech Stack</span>
            </div>
            <div class="flex flex-row gap-2 justify-center">
                <!-- <template v-for="t in techList" :key="t" class="flex flex-col">
                    <TechCard :name="t?.name" :id="t.id" />
                </template> -->
            </div>
        </div>
    </div>
</template>

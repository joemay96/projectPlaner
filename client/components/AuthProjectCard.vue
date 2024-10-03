<script setup lang="ts">
const props = defineProps({
    id: String,
    title: String,
    description: String,
    motivation: String,
    workEstimation: String,
    techStack: Array,
    tags: Array<String>,
});

const { id, title, description, motivation, workEstimation, techStack, tags } =
    props;
</script>

<template>
    <div class="card bg-base-100 shadow-2xl">
        <div class="card-body">
            <div class="flex flex-row justify-between">
                <div class="">
                    <h2
                        class="text-2xl font-bold text-primary hover:text-primary-focus hover:underline mb-4"
                    >
                        <a href="#">{{ title }}</a>
                    </h2>
                    <p class="">
                        <span class="">Work estimation: </span
                        >{{ workEstimation }}
                    </p>
                </div>
                <div class="flex flex-col gap-1 justify-center">
                    <template v-for="(tag, index) in tags" :key="index">
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
            <div class="divider">Description</div>
            <p>{{ description }}</p>
            <div class="divider"><span class="font-bold">Motivation</span></div>
            <p>{{ motivation }}</p>
            <p>
                <span class="font-bold">Work estimation:</span>
                {{ workEstimation }}
            </p>
            <div class="divider">Techstack</div>
            <div class="flex flex-row gap-2 justify-center pt-[-12px]">
                <template
                    v-for="(t, index) in techStack"
                    :key="t"
                    class="flex flex-col"
                >
                    <TechCard :name="t" :id="index.toString()" />
                </template>
            </div>
        </div>
    </div>
</template>

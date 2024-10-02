<script setup lang="ts">
const props = defineProps({
    id: { type: String, required: true },
    userid: String,
    title: { type: String, required: true },
    description: { type: String, default: '' },
    motivation: { type: String, default: '' },
    workEstimation: { type: String, default: '' },
    tags: { type: String, default: '' },
    techStack: { type: Array<string>, default: [''] },
    fullTechList: Array,
    link: { type: String, default: '' },
    github_link: { type: String, default: '' },
    created: { type: Date, required: true },
    updated: { type: Date, required: true },
});

const {
    id,
    userid,
    title,
    description,
    motivation,
    workEstimation,
    fullTechList,
    created,
    link,
    github_link,
} = props;
let { tags, techStack, updated } = props;

let tagList: any = ref([]);
const techList: any = ref([]);
let updatedDateString = ref('');
const createdDateString = `${created.getUTCDate()}-${
    created.getUTCMonth() + 1
}-${created.getUTCFullYear()}`;

// Setup functions
function setTagList() {
    if (tags && tags != '') {
        tagList.value = tags?.split(',');
    }
}
function updateDateString() {
    updatedDateString.value = `${updated.getUTCDate()}-${
        updated.getUTCMonth() + 1
    }-${updated.getUTCFullYear()}`;
}
function setTechList() {
    techList.value = [];
    techStack?.forEach(techId => {
        techList.value.push(
            fullTechList?.filter((item: any) => item.id === techId)[0],
        );
    });
}
(function init() {
    setTagList();
    updateDateString();
    setTechList();
})();
</script>

<template>
    <div class="card my-10 sm:mx-20 mx-2 bg-base-200 shadow-2xl max-w-2xl">
        <figure>
            <img src="../../assets/images/tech/1.jpg" alt="Movie" width="750" />
        </figure>

        <div class="card-body">
            <h2 class="text-3xl font-bold text-primary text-center">
                {{ title }}
            </h2>
            <div class="flex justify-center">
                <div class="projectHeaderitem">
                    <p class="">
                        <span class="">Work estimation: </span
                        >{{ workEstimation }}
                    </p>
                    <p>Created: {{ createdDateString }}</p>
                    <p>updated: {{ updatedDateString }}</p>
                </div>

                <div
                    class="projectHeaderitem flex flex-col gap-1 justify-center"
                >
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
            <p class="mb-[-6px] mt-4">
                <span class="font-bold mr-2">Project Website:</span>
                <a
                    class="text-primary hover:underline"
                    :href="link"
                    target="_blank"
                    >{{ link }}</a
                >
            </p>
            <p class="mb-2">
                <span class="font-bold mr-2">Github:</span>
                <a
                    class="text-primary hover:underline"
                    :href="github_link"
                    target="_blank"
                    >{{ github_link }}</a
                >
            </p>

            <div class="divider font-bold">Project Information</div>
            <div class="flex">
                <div>
                    <p class="font-bold mb-2 text-secondary">Description</p>
                    <p class="">{{ description }}</p>
                    <p class="font-bold my-2 text-secondary">Motivation</p>
                    <p class="">{{ motivation }}</p>
                    <p class="font-bold my-2 text-secondary">Tech Stack</p>
                    <div class="flex flex-row gap-2 justify-start">
                        <template
                            v-for="t in techList"
                            :key="t"
                            class="flex flex-col"
                        >
                            <TechCard :name="t.name" :id="t.id" />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.projectHeaderitem:not(:nth-child(2)) {
    flex-basis: 0%;
    flex-grow: 1;
}

.projectHeaderitem:last-child {
    align-items: end;
}
</style>

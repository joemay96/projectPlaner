<script setup lang="ts">
import client from '~/plugins/auth/client';

const props = defineProps({
    id: { String, required: true },
    userid: String,
    title: String,
    description: String,
    motivation: String,
    workEstimation: String,
    tags: String,
    techStack: Array,
    fullTechList: Array,
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
    tags,
    techStack,
    fullTechList,
    created,
    updated,
} = props;

let tagList: any = [];

if (tags != '') {
    tagList = tags.split(',');
}

const createdDate = new Date(created);
const createdDateString = `${createdDate.getUTCDate()}-${
    createdDate.getUTCMonth() + 1
}-${createdDate.getUTCFullYear()}`;

const updatedDate = new Date(updated);
const updatedDateString = `${updatedDate.getUTCDate()}-${
    updatedDate.getUTCMonth() + 1
}-${updatedDate.getUTCFullYear()}`;

const techList: any = [];
techStack.forEach(techId => {
    techList.push(fullTechList.filter(item => item.id === techId)[0]);
});

function editButton() {
    console.log('Edit pressed');
}

function deleteButton() {
    console.log('Delete Button pressed');
}
</script>

<template>
    <div class="card my-10 mx-20 bg-neutral text-neutral-content max-w-6xl">
        <div class="card-body">
            <!-- items-center text-center -->
            <div class="flex flex-row justify-between">
                <div class="">
                    <p class="">
                        <span class="">Work estimation: </span
                        >{{ workEstimation }}
                    </p>
                    <p>Created: {{ createdDateString }}</p>
                    <p>updated: {{ updatedDateString }}</p>
                </div>

                <h2 class="text-2xl font-bold text-primary">
                    <!---->
                    {{ title }}
                </h2>

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

            <div class="divider">Project Information</div>
            <div class="flex gap-4">
                <div>
                    <p class="font-bold my-2">Description</p>
                    <p class="">{{ description }}</p>
                    <p class="font-bold my-2">Motivation</p>
                    <p class="">{{ motivation }}</p>
                    <p class="font-bold my-2">Tech Stack</p>
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
            <div class="card-actions justify-end">
                <button class="btn btn-warning" @click="editButton">
                    Edit
                </button>
                <button class="btn btn-error" @click="deleteButton">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $createSuccessAlert, $createErrorAlert, $client } = useNuxtApp();
const route = useRoute();
const projectStore = useProject();

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
} = props;
let { tags, techStack, updated } = props;

const titleRef = toRef(title),
    descriptionRef = toRef(description),
    motivationRef = toRef(motivation),
    workEstimationRef = toRef(workEstimation);

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

function editProject() {
    // @ts-ignore
    edit_project_modal.showModal();
}

async function deleteButton() {
    try {
        const res = await $client.deleteProjectById(id);
        $createSuccessAlert('Project deleted');
        projectStore.deleteProjectById(id);
        navigateTo('/');
    } catch (error) {
        $createErrorAlert('Could not delete project');
        console.log(error);
    }
}

function refreshData() {
    const updatedProject = projectStore.getProjectById(id);
    titleRef.value = updatedProject.title;
    descriptionRef.value = updatedProject.description;
    motivationRef.value = updatedProject.motivation;
    workEstimationRef.value = updatedProject.workEstimation;
    tags = updatedProject.tags;
    techStack = updatedProject.techStack;
    updated = new Date(updatedProject.updated);
    updateDateString();
    setTagList();
    setTechList();
}

function openMarkdownEditor() {
    console.log('Add Notes Button pressed');
}

function shareClick() {
    if (navigator.share) {
        navigator
            .share({
                title: titleRef.value,
                text: descriptionRef.value,
                url: route.fullPath,
            })
            .then(() => console.log('Shared successfully'))
            .catch(error => console.log('Error sharing this project', error));
    } else {
        navigator.clipboard.writeText(window.location.href);
        console.log('Copied Link');
    }
}
</script>

<template>
    <div class="card my-10 sm:mx-20 mx-2 bg-base-200 shadow-2xl max-w-6xl">
        <div class="card-body">
            <!-- items-center text-center -->
            <div class="flex justify-center">
                <div class="projectHeaderitem">
                    <p class="">
                        <span class="">Work estimation: </span
                        >{{ workEstimationRef }}
                    </p>
                    <p>Created: {{ createdDateString }}</p>
                    <p>updated: {{ updatedDateString }}</p>
                </div>

                <h2
                    class="projectHeaderitem text-2xl font-bold text-primary justify-self-center"
                >
                    <!---->
                    {{ titleRef }}
                </h2>

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

            <div class="divider">Project Information</div>
            <div class="flex gap-4">
                <div>
                    <p class="font-bold my-2">Description</p>
                    <p class="">{{ descriptionRef }}</p>
                    <p class="font-bold my-2">Motivation</p>
                    <p class="">{{ motivationRef }}</p>
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
                    <label
                        class="input input-bordered flex items-center gap-2 max-w-xl my-2"
                    >
                        Github
                        <input
                            type="text"
                            class="grow"
                            placeholder="https://github.com/joemay96/projectplaner"
                        />
                        <!-- v-model="githubRef" -->
                    </label>
                    <label
                        class="input input-bordered flex items-center gap-2 max-w-xl my-2"
                    >
                        Link to Project
                        <input
                            type="text"
                            class="grow"
                            placeholder="https://projectplaner.sharky.live"
                        />
                        <!-- v-model="githubRef" -->
                    </label>
                    <div class="form-control w-52">
                        <label class="label cursor-pointer">
                            <span class="label-text">Publish project</span>
                            <input
                                type="checkbox"
                                class="toggle toggle-accent"
                            />
                        </label>
                    </div>
                </div>
            </div>
            <div class="card-actions justify-between mt-8">
                <!-- <button class="btn btn-secondary" @click="openMarkdownEditor">
                    Add Notes
                </button> -->
                <button class="btn btn-neutral btn-outline" @click="shareClick">
                    <Icon
                        size="24px"
                        name="fluent:share-ios-24-filled"
                        color="fill-current"
                    />
                </button>
                <div class="flex gap-2">
                    <button
                        class="btn btn-warning btn-outline"
                        @click="editProject"
                    >
                        <Icon size="24px" name="mdi:pen" color="fill-current" />
                    </button>
                    <button
                        class="btn btn-error btn-outline"
                        @click="deleteButton"
                    >
                        <Icon
                            size="24px"
                            name="fluent:delete-48-regular"
                            color="fill-current"
                        />
                    </button>
                </div>
            </div>
        </div>
    </div>
    <ModalsEditProject
        :id="id"
        :userid="userid"
        :title="title"
        :description="description"
        :motivation="motivation"
        :workEstimation="workEstimation"
        :techStack="techStack"
        :tags="tagList"
        @updatedProject="refreshData"
    />
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

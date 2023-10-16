<script setup lang="ts">
import client from '~/plugins/auth/client';
const user = client.getUserLS();

definePageMeta({
    middleware: ['auth'],
});

let data: any = [];
let imgBasePath: String = `${client.getUrl()}/api/files`;

try {
    data = await client.getTechList();
} catch (error) {
    // TODO: report error to user
    console.log(error);
}

// const projectData = {
// 	id: "",
// 	userid: user.id,
// 	name: "",
// 	area: "",
// 	imagePath: null,
// 	url: ""
// }

const id = ref('');
const name = ref('');
const area = ref('');
const imagePath = ref('');
const url = ref('');

function openEditTechModal(pd) {
    id.value = pd.id;
    name.value = pd.name;
    area.value = pd.area;
    imagePath.value = pd.imagePath;
    url.value = pd.url;

    edit_tech_modal.showModal();
}
</script>

<template>
    <div class="flex justify-center">
        <h1 class="text-4xl text-secondary font-extrabold pb-8">
            My Techstack
        </h1>
    </div>
    <div
        class="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-2 gap-4 px-8 md:px-20 flex-1 justify-around"
    >
        <template v-for="t in data" key="p.id">
            <!-- @ts-ignore -->
            <TechStackCard
                :id="t.id"
                :name="t.name"
                :area="t.area"
                :imagePath="
                    `${imgBasePath}/${t.collectionId}/${t.id}/${t.image}` || ''
                "
                :url="t.url"
                @editTech="openEditTechModal"
            />
        </template>
    </div>
    <ModalsEditTech
        :id="id"
        :userid="user.id"
        :name="name"
        :area="area"
        :imagePath="imagePath"
        :url="url"
    />
    <div class="mb-20"></div>
</template>

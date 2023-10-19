<script setup lang="ts">
const { $client } = useNuxtApp();
const store = useTech()

const user = $client.getUserLS();

definePageMeta({
    middleware: ['auth'],
});

let imgBasePath: String = `${$client.getUrl()}/api/files`;

const id = ref('');
const name = ref('');
const area = ref('');
const imagePath = ref('');
const url = ref('');

function openEditTechModal(pd: any) {
    id.value = pd.id;
    name.value = pd.name;
    area.value = pd.area;
    imagePath.value = pd.imagePath;
    url.value = pd.url;
    //@ts-ignore
    edit_tech_modal.showModal();
}
</script>

<template>
    <main>
        <div class="flex justify-center">
            <h1 class="text-4xl text-secondary font-extrabold pb-8">
                My Techstack
            </h1>
        </div>
        <div
            class="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-2 gap-4 px-8 md:px-20 flex-1 justify-around"
        >
            <template v-for="t in store.getTechs" :key="t.id">
                <!-- @ts-ignore -->
                <TechStackCard
                    :id="t.id"
                    :name="t.name"
                    :area="t.area"
                    :imagePath="
                        `${imgBasePath}/${t.collectionId}/${t.id}/${t.image}` ||
                        ''
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
    </main>
</template>

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
const url = ref();

const counter = ref(0);

function openEditTechModal(pd: any) {
    const data = store.getTechById(pd.id.value)
    id.value = pd.id;
    name.value = data.name;
    area.value = data.area;
    imagePath.value = pd.imageBasePath.value;
    url.value = data.url;
    //@ts-ignore
    edit_tech_modal.showModal();
}

function refreshData() {
    counter.value += 1;
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
                <TechStackCard
                    :id="t.id"
                    :imageBasePath="
                        `${imgBasePath}/${t.collectionId}/${t.id}` ||
                        ''
                    "
                    :dataUpdate="counter"
                    @editTech="openEditTechModal"
                />
            </template>
        </div>
        <ModalsEditTech
            :id="id"
            :userid="user.id"
            @updatedTech="refreshData"
        />
        <div class="mb-20"></div>
    </main>
</template>

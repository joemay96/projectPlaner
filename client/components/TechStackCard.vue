<script setup lang="ts">
const { $createSuccessAlert, $createErrorAlert, $client } = useNuxtApp();
const techStore = useTech();

const emit = defineEmits(['editTech']);

const props = defineProps({
    id: ref(""),
    imageBasePath: "",
    dataUpdate: ref(""),
});

const { id, dataUpdate } = toRefs(props);
const {imageBasePath} = props;
let { name, area, url, image } = techStore.getTechById(id.value)
let imageName = image;

watch(dataUpdate, (newVal, oldVal) => {
    // TODO: update more specific and only reload one data via id that was updated
    const dataupdate = techStore.getTechById(id.value)
    name = dataupdate.name;
    area = dataupdate.area;
    url = dataupdate.url;
    imageName = dataupdate.image;
    updateImagePath(dataupdate.image)
})


let imageUrl = ref('');
function updateImagePath(imagePath: any) {
    if (imageBasePath && imageBasePath != '' && imageName != '') {
    imageUrl.value = `${imageBasePath}/${imagePath}`;
    } else {
        imageUrl.value = new URL('../assets/images/tech/default.jpg', import.meta.url)
            .href;
    }
}
updateImagePath(imageName)


function deleteTech() {
    try {
        $client.deleteTechById(id.value);
        $createSuccessAlert('Tech deleted');
        techStore.deleteTechById(id.value);
    } catch (error) {
        console.log(error);
        $createErrorAlert('Tech not deleted');
    }
}

function searchTech() {
    if (url && url != '') {
        console.log(url);
        window.open(url, '_blank')?.focus();
    } else {
        window
            .open(`https://duckduckgo.com/?q=${name}&ia=web`, '_blank')
            ?.focus();
    }
}

function editTechEmit() {
    emit('editTech', {
        id,
        imageBasePath,
    });
}
</script>

<template>
    <div class="card card-compact max-w-md bg-base-100 shadow-xl">
        <figure class="" @click="searchTech()">
            <img :src="imageUrl" class="w-full" alt="TechStack" />
        </figure>
        <div class="card-body">
            <div
                v-if="url"
                class="tooltip tooltip-top tooltip-secondary"
                :data-tip="url"
            >
                <h2
                    class="card-title hover:cursor-pointer hover:text-secondary hover:underline"
                    @click="searchTech()"
                >
                    {{ name }}
                </h2>
            </div>
            <h2
                v-else
                class="card-title hover:cursor-pointer hover:text-secondary hover:underline"
                @click="searchTech()"
            >
                {{ name }}
            </h2>
            <!-- <a v-if="url" :href="url" target="_blank" class="link link-secondary">{{ url }}</a> -->
            <p class="">{{ area }}</p>
            <div class="card-actions justify-between">
                <button class="btn btn-warning" @click="editTechEmit">
                    <Icon size="24px" name="mdi:pen" color="white" />
                </button>
                <button class="btn btn-error" @click="deleteTech">
                    <Icon
                        size="24px"
                        name="fluent:delete-48-regular"
                        color="white"
                    />
                </button>
            </div>
        </div>
    </div>
</template>

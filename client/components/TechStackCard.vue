<script setup lang="ts">
const { $createSuccessAlert, $createErrorAlert, $client } = useNuxtApp();
const techStore = useTech();

const emit = defineEmits(['editTech']);

const props = defineProps({
    // id: { type: ref(), required: true },
    // imagePath: { type: ref(), default: ref("../assets/images/tech/default.jpg") },
    id: ref(""),
    imageBasePath: ref(""),
    dataUpdate: ref(""),
});

const { id, imageBasePath, dataUpdate } = toRefs(props);
let { name, area, url } = techStore.getTechById(id.value)

watch(imageBasePath,
    (newVal, oldVal) => {
        console.log("imagePath: ", imageBasePath)
        console.log(newVal)
        imageBasePath.value = newVal
    },
    { deep: true },
);
watch(dataUpdate, (newVal, oldVal) => {
    const dataupdate = techStore.getTechById(id.value)
    name = dataupdate.name;
    area = dataupdate.area;
    url = dataupdate.url;
})


let imageUrl = ref('');
if (imageBasePath.value && imageBasePath.value != '' && imageBasePath.value.split('/').at(-1) != '') {
    imageUrl.value = imageBasePath.value;
} else {
    imageUrl.value = new URL('../assets/images/tech/default.jpg', import.meta.url)
        .href;
}

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
        <!-- <div v-if="url" class="tooltip tooltip-bottom tooltip-secondary" :data-tip="url">
			<figure class="hover:cursor-pointer" @click="searchTech()">
				<img :src="imageUrl" alt="TechStack"/>
			</figure>
		</div> -->
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

<script setup lang="ts">
const { $createSuccessAlert, $createErrorAlert, $client } = useNuxtApp();
const techStore = useTech();
import { isValidHttpUrl } from '~/plugins/utils/valFuncs.js';

const emit = defineEmits(['updatedTech']);

const props = defineProps({
    // @ts-ignore
    id: ref(),
    userid: String,
});

const { id, userid } = props;
const refProps = toRefs(props);

let imgBasePath: String = `${$client.getUrl()}/api/files`;
let collectionId: string | undefined = '';

let loading = ref(false);

watch(
    refProps.id,
    (newVal, oldVal) => {
        const current_tech_id = refProps.id.value.value;
        newTech.id = current_tech_id;

        const tech = techStore.getTechById(current_tech_id);
        collectionId = tech.collectionId;

        newTech.name = tech.name;
        newTech.area = tech.area;
        newTech.image = tech.image;
        newTech.url = tech.url;
        checkImagePath(
            `${imgBasePath}/${collectionId}/${newTech.id}/${tech.image}`,
        );
    },
    { deep: true },
);

let imageUrl = ref('');
function checkImagePath(imagePath: string) {
    if (imagePath && imagePath != '' && imagePath.split('/').at(-1) != '') {
        imageUrl.value = imagePath;
    } else {
        imageUrl.value = new URL(
            '../assets/images/tech/default.jpg',
            import.meta.url,
        ).href;
    }
}

type tech = {
    id: string;
    userid: string;
    name: string;
    area: string;
    image: string;
    url: URL | string | null;
};

let newTech: tech = {
    id: id,
    userid: userid,
    name: '',
    area: '',
    image: '',
    url: '',
};

function onFileChange(e: any) {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    newTech.image = files[0];
    updatePicture(files[0]);
}

function updatePicture(file: File) {
    let reader = new FileReader();
    reader.onload = function (e) {
        const profileImage: any = document.getElementById('techImage');
        profileImage.src = e.target?.result;
    };
    reader.readAsDataURL(file);
}

// save the data to pocketbase
async function updateTech() {
    if (newTech.name === '') {
        // TODO: mache Error erkennbar
        console.error('Name can not be empty');
        return;
    }

    if (!isValidHttpUrl(newTech.url) && newTech.url !== '') {
        console.error('Not a valid url');
        return;
    }

    try {
        loading.value = true;
        const res = await $client.updateTechById(newTech.id, newTech);
        techStore.updateTech(res);
        setTimeout(() => {
            loading.value = false;
            // @ts-ignore
            edit_tech_modal.close();
            emit('updatedTech');
            $createSuccessAlert('Tech updated');
        }, 500);
    } catch (error) {
        $createErrorAlert('Tech could not be updated');
        console.error(error);
    }
}
</script>

<template>
    <dialog id="edit_tech_modal" class="modal">
        <div class="modal-box w-11/12 max-w-xl">
            <form method="dialog">
                <button
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>
            </form>
            <h3 class="font-bold text-xl">
                Tech edit of
                <span class="text-primary">{{ newTech.name }}</span>
            </h3>
            <div class="modal-action">
                <div class="w-full flex flex-col">
                    <div class="form-control w-full max-w-2xl">
                        <label class="label">
                            <span class="label-text">Tech name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            class="input input-bordered w-full max-w-2xl"
                            v-model="newTech.name"
                        />
                    </div>
                    <div class="form-control w-full max-w-2xl">
                        <label class="label">
                            <span class="label-text">Area</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Tech area e.p. Backend, Frontend etc."
                            class="input input-bordered w-full max-w-2xl"
                            v-model="newTech.area"
                        />
                    </div>
                    <div class="form-control w-full max-w-2xl">
                        <label class="label">
                            <span class="label-text">Url to Techsite</span>
                        </label>
                        <input
                            type="url"
                            placeholder="https://projectplaner.io/"
                            class="input input-bordered w-full max-w-2xl"
                            v-model="newTech.url"
                        />
                    </div>
                    <div class="w-full flex justify-center items-center mt-4">
                        <img
                            :src="imageUrl"
                            class="w-56 rounded-xl"
                            id="techImage"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label pb-0">
                            <span class="label-text">Change Picture</span>
                        </label>
                        <input
                            type="file"
                            class="file-input file-input-bordered file-input-primary w-full max-w-xs my-4"
                            v-on:change="onFileChange"
                        />
                    </div>
                    <div v-if="loading" class="flex justify-center">
                        <span class="loading loading-dots loading-lg"></span>
                    </div>
                    <button
                        v-else
                        class="btn btn-warning max-w-2xl"
                        @click="updateTech"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    </dialog>
</template>

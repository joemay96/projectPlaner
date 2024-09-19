<script setup lang="ts">
const { $client } = useNuxtApp();
const store = useProfile();
import type { dbProfile } from '@/types/profile';

const user = $client.getUserLS();

definePageMeta({
    middleware: ['auth'],
});

let loading = ref(false);

// let imgBasePath: String = `${$client.getUrl()}/api/files`;

// let profile: dbProfile = {
// 	id: user.id,
// 	firstname: user.f_name,
// 	lastname: user.l_name,
// 	website: user.website,
// 	info: user.info,
// 	interests: user.interests,
// 	contact_info: user.contact_info,
// 	status: user.status,
// };

const profile = store.getProfile;

// const id = ref('');
// const name = ref('');
// const area = ref('');
// const imagePath = ref('');
// const url = ref();

// const counter = ref(0);

// function openEditTechModal(pd: any) {
//     const data = store.getProfile(pd.id.value);
//     id.value = pd.id;
//     name.value = data.name;
//     area.value = data.area;
//     imagePath.value = pd.imageBasePath.value;
//     url.value = data.url;
//     //@ts-ignore
//     edit_tech_modal.showModal();
// }

// function refreshData() {
//     counter.value += 1;
// }

function saveProfile() {
    console.log('Save Profile');
    // store.saveProfile(profile);
}
</script>

<template>
    <main>
        <div class="flex justify-center">
            <h1 class="text-4xl text-secondary font-extrabold pb-8">Profile</h1>
        </div>
        <div class="grid px-2 md:px-20 flex-1 justify-around">
            <p class="text-lg my-2">
                In your profile you can others give some information about you
                and show your flair ✨
            </p>
            <div class="w-full flex flex-col">
                <div class="form-control w-full my-1">
                    <label class="input input-bordered flex items-center gap-2">
                        <span class="label-text">Firstname</span>
                        <input
                            type="text"
                            placeholder="Name"
                            class="grow"
                            v-model="profile.f_name"
                        />
                    </label>
                </div>
                <div class="form-control w-full my-1">
                    <label class="input input-bordered flex items-center gap-2">
                        <span class="label-text">Lastname</span>
                        <input
                            type="text"
                            placeholder="Name"
                            class="grow"
                            v-model="profile.l_name"
                        />
                    </label>
                </div>
                <div class="form-control w-full my-1">
                    <label class="input input-bordered flex items-center gap-2">
                        <span class="label-text">Website</span>
                        <input
                            type="url"
                            placeholder="https://projectplaner.sharky.live/"
                            class="grow"
                            v-model="profile.website"
                        />
                    </label>
                </div>
                <div class="form-control w-full my-1">
                    <label class="label">
                        <span class="label-text">Some info about you</span>
                    </label>
                    <textarea
                        placeholder="Some info about you"
                        class="textarea textarea-bordered h-24"
                        v-model="profile.info"
                    >
                    </textarea>
                </div>
                <div class="form-control w-full my-1">
                    <label class="label">
                        <span class="label-text">Interests</span>
                    </label>
                    <textarea
                        placeholder="Some of your interests"
                        class="textarea textarea-bordered h-24"
                        v-model="profile.interests"
                    >
                    </textarea>
                </div>
                <div class="form-control w-full my-1">
                    <label class="input input-bordered flex items-center gap-2">
                        <span class="label-text">Contact Info</span>

                        <input
                            type="test"
                            placeholder="How can people reach you?"
                            class="grow"
                            v-model="profile.contact_info"
                        />
                    </label>
                </div>
                <div class="form-control w-full my-1">
                    <label class="input input-bordered flex items-center gap-2">
                        <span class="label-text">Status</span>
                        <input
                            type="test"
                            placeholder="Your employment status"
                            class="grow"
                            v-model="profile.status"
                        />
                    </label>
                </div>
                <div v-if="loading" class="flex justify-center">
                    <span class="loading loading-dots loading-lg"></span>
                </div>
                <button
                    v-else
                    class="btn btn-success mt-4"
                    @click="saveProfile"
                >
                    Save
                </button>
            </div>
        </div>
        <div class="mb-20"></div>
    </main>
</template>

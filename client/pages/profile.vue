<script setup lang="ts">
const { $client, $createSuccessAlert, $createErrorAlert } = useNuxtApp();
const store = useProfile();
// import type { dbProfile } from '@/types/profile';

// const user = $client.getUserLS();

definePageMeta({
    middleware: ['auth'],
});

let loading = ref(false);

const profile = store.getProfile;

async function saveProfile() {
    try {
        loading.value = true;
        const res = await $client.updateProfileById(profile.id, {
            f_name: profile.f_name,
            l_name: profile.l_name,
            website: profile.website,
            info: profile.info,
            interests: profile.interests,
            contact_info: profile.contact_info,
            status: profile.status,
            show: profile.show,
        });
        store.updateProfile(profile);
        setTimeout(() => {
            loading.value = false;
            $createSuccessAlert('Profile updated');
        }, 500);
    } catch (error) {
        loading.value = false;
        $createErrorAlert('Profile not updated - please try again');
        console.error(error);
    }
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
            <p class="text my-2">
                See your
                <a :href="`/user/${profile.id}`" target="_blank">Profile</a>
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
                <div class="form-control w-64">
                    <label class="label cursor-pointer">
                        <span class="label-text">Show profile to public</span>
                        <input
                            type="checkbox"
                            class="toggle toggle-accent"
                            v-model="profile.show"
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

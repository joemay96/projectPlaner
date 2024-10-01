<script setup lang="ts">
const { $client, $createSuccessAlert, $createErrorAlert } = useNuxtApp();
const store = useProfile();
import { Icon } from '#components';
const colorMode = useColorMode();

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
            avatar: profile.avatar,
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

// everything for the avatar/Image thing
let imgUrl = '';
if (profile) {
    imgUrl = `${$client.getUrl()}/api/files/${profile.collectionId}/${
        profile.id
    }/${profile.avatar}`;
}

const baseContentColor = getComputedStyle(document.body).getPropertyValue(
    'var(--bc)',
);

let iconColor = ref('');
iconColor.value = baseContentColor;
let iconSize = '72px';

if (colorMode.preference === 'dark') {
    iconColor.value = 'white';
}

if (window.innerWidth < 384) {
    iconSize = '52px';
}

const ProfileIcon = h(Icon, {
    name: 'mdi:account-circle',
    size: iconSize,
    color: iconColor,
});

function profilePictureChange(e: any) {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    profile.avatar = files[0];
    updateProfilePicture(files[0]);
}

//create Reader to update the profile Picture
function updateProfilePicture(file: File) {
    let reader = new FileReader();
    reader.onload = function (e) {
        const profileImage: any = document.getElementById('avatarImage');
        profileImage.src = e.target?.result;
    };
    reader.readAsDataURL(file);
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
                <a
                    :href="`/user/${profile.id}`"
                    target="_blank"
                    class="text-xl text-secondary hover:underline"
                    >Profile</a
                >
            </p>
            <div class="flex items-center flex-col">
                <div
                    class="w-56 sm:w-96 mt-12 flex justify-center mask mask-squircle"
                >
                    <!-- rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 -->
                    <img :src="imgUrl" class="w-56" id="avatarImage" />
                </div>
                <label
                    for="changeProfilePicture"
                    class="self-center hover:cursor-pointer z-10 relative bottom-8 pl-0 ml-0 sm:bottom-12 left-28"
                >
                    <ProfileIcon />
                </label>
                <input
                    id="changeProfilePicture"
                    type="file"
                    class="hidden"
                    v-on:change="profilePictureChange"
                />
            </div>
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

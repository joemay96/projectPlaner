<script setup lang="ts">
const { $createSuccessAlert, $createErrorAlert, $client } = useNuxtApp();
import { Icon } from '#components';
const colorMode = useColorMode();

definePageMeta({
    middleware: ['auth'],
});

const user = $client.getUserLS();
const oldUsername = user.username;

let updatedUser = {
    username: '',
    password: '',
    newPassword: '',
    email: user.email,
    profileImage: null,
};

function profilePictureChange(e: any) {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    updatedUser.profileImage = files[0];
    updateProfilePicture(files[0]);
}

//create Reader to update the profile Picture
function updateProfilePicture(file: File) {
    let reader = new FileReader();
    reader.onload = function (e) {
        const profileImage: any = document.getElementById('profileImage');
        profileImage.src = e.target?.result;
    };
    reader.readAsDataURL(file);
}

let imgUrl = '';
if (user) {
    imgUrl = `${$client.getUrl()}/api/files/_pb_users_auth_/${user.id}/${
        user.avatar
    }`;
}

async function updateUserData() {
    try {
        const res = await $client.updateUser(updatedUser);
        $createSuccessAlert('Information updated');
        console.log(res);
        window.location.reload();
    } catch (error) {
        $createErrorAlert('Could not update information');
        console.error(error);
    }
}

const baseContentColor = getComputedStyle(document.body).getPropertyValue(
    'var(--bc)',
);

let iconColor = ref("")
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
</script>

<template>
    <main>
        <div class="flex justify-center">
            <h1 class="text-4xl text-secondary font-extrabold pb-8">
                Settings
            </h1>
        </div>
        <div class="flex flex-col items-center mb-12">
            <div class="flex items-center flex-col">
                <div
                    class="w-56 sm:w-96 mt-12 flex justify-center mask mask-squircle"
                >
                    <!-- rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 -->
                    <img :src="imgUrl" class="w-56" id="profileImage" />
                </div>
                <label
                    for="changeProfilePicture"
                    class="self-end hover:cursor-pointer z-10 relative bottom-8 sm:bottom-20 pl-0 ml-0"
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
            <div class="w-full flex flex-col items-center mt-6 px-2">
                <div class="form-control w-full max-w-lg mb-4">
                    <p>
                        Your password is needed to change settings for your
                        profile.
                    </p>
                    <p class="mb-4">
                        Your registered email is:
                        <span class="font-bold">{{ user.email }}</span>
                    </p>
                    <label class="label">
                        <span class="label-text">Old Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="********"
                        class="input input-bordered w-full max-w-lg"
                        v-model="updatedUser.password"
                    />
                </div>
                <div class="form-control w-full max-w-lg mb-4">
                    <label class="label">
                        <span class="label-text">Change Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="********"
                        class="input input-bordered w-full max-w-lg"
                        v-model="updatedUser.newPassword"
                    />
                </div>
                <div class="form-control w-full max-w-lg mb-4">
                    <p class="mb-1">
                        <span>Current Username: </span>
                        {{ user.username }}
                    </p>
                    <input
                        type="text"
                        :placeholder="oldUsername"
                        class="input input-bordered w-full max-w-lg"
                        v-model="updatedUser.username"
                    />
                </div>
                <!-- <div class="form-control w-full max-w-lg mb-4">
				<p class="mb-1"><span>Current email:</span>
				{{user.email}}
				</p>
				<input type="email" placeholder="Change email" class="input input-bordered w-full max-w-lg" v-model="updatedUser.email" />
			</div> -->
                <button
                    class="btn btn-success max-w-xs"
                    @click="updateUserData"
                >
                    Save
                </button>
            </div>
        </div>
    </main>
</template>

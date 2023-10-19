<script setup lang="ts">
// Habe im Moment kein Client modul
const { $createSuccessAlert, $updateUserStatus, $client, $userStatus } = useNuxtApp();

watch($userStatus, (newVal, oldVal) => {
    if (newVal) {
        user.value = $client.getUserLS();
        imgUrl = `${$client.getUrl()}/api/files/_pb_users_auth_/${
            user.value.id
        }/${user.value.avatar}`;
    } else {
        user.value = null;
    }
});

let user = ref();
if (process.client) {
    user.value = $client.getUserLS();
}

let imgUrl = '';
if (user.value) {
    imgUrl = `${$client.getUrl()}/api/files/_pb_users_auth_/${user.value.id}/${
        user.value.avatar
    }`;
}

const logout = async () => {
    $createSuccessAlert('Logout successful');
    await $client.logout();
    $updateUserStatus(false);
    await navigateTo('/auth');
};
</script>

<template>
    <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
                <template v-if="user">
                    <img :src="imgUrl" alt="user-profile" />
                </template>
                <template v-else>
                    <img src="../../assets/images/dummy-user.jpg" />
                </template>
            </div>
        </label>
        <ul
            v-if="user"
            tabindex="0"
            class="z-40 mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
            <!-- <li> -->
            <!-- <NuxtLink class="justify-between" to="/profile"> -->
            <!-- Profile -->
            <!-- </NuxtLink> -->
            <!-- </li> -->
            <li><NuxtLink to="/settings">Settings</NuxtLink></li>
            <li>
                <a @click="logout">Logout</a>
            </li>
        </ul>
    </div>
</template>

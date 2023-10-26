<script setup lang="ts">
const {
    $createSuccessAlert,
    $createErrorAlert,
    $updateUserStatus,
    $client,
    $refetchStoreData,
} = useNuxtApp();

const router = useRouter();

const email = ref('');
const password = ref('');

let loading = ref(false);

async function login() {
    loading.value = true;
    const authData = await $client.authenticate(email.value, password.value);
    if (authData.status >= 400 && authData.status <= 499) {
        // throw alert - failed login
        setTimeout(() => {
            loading.value = false;
        }, 250);
        console.log('Failed login');
        $createErrorAlert('Wrong username or password');
    }
    if (authData.token) {
        //successful login
        $client.createUserLS({
            id: authData.record.id,
            name: authData.record.name,
            email: authData.record.email,
            username: authData.record.username,
            avatar: authData.record.avatar,
        });
        $updateUserStatus(true);
        $refetchStoreData();
        setTimeout(() => {
            loading.value = false;
        }, 500);

        // @ts-ignore
        login_modal.close();
        await navigateTo('/');
        $createSuccessAlert('Welcome!');
    } else {
        // if something else happens
        setTimeout(() => {
            loading.value = false;
        }, 500);
        $createErrorAlert('Something went wrong');
    }
}
</script>

<template>
    <button class="btn btn-ghost" onclick="login_modal.showModal()">
        Login
    </button>
    <dialog id="login_modal" class="modal">
        <div class="modal-box w-full max-w-2xl">
            <form method="dialog" autocomplete="on">
                <button
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>
            </form>
            <h3 class="font-bold text-lg">Login</h3>
            <p class="py-4">Login to manage your projects</p>
            <!-- <div class="modal-action"> -->
            <form method="" @keydown.enter="login()">
                <div v-if="loading" class="flex justify-center">
                    <span class="loading loading-dots loading-lg"></span>
                </div>
                <!-- dialog method-->
                <template v-else>
                    <div class="form-control w-full max-w-2xl">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            class="input input-bordered w-full max-w-2xl"
                            v-model="email"
                            autocomplete="on"
                        />
                    </div>
                    <div class="form-control w-full max-w-2xl">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            class="input input-bordered w-full max-w-2xl"
                            v-model="password"
                            autocomplete="on"
                        />
                    </div>
                    <!-- if there is a button in form, it will close the modal -->
                    <button
                        type="button"
                        class="btn btn-primary mt-2"
                        @click="login()"
                    >
                        Login
                    </button>
                </template>
            </form>
            <!-- </div> -->
        </div>
    </dialog>
</template>

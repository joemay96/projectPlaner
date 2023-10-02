<script setup lang="ts">
// Habe im Moment kein Client modul
// import Client from "~/modules/auth/authConnector.mjs";
const router = useRouter();
// const client = useSupabaseClient();

const logout = async () => {
  // await Client.logout();
  navigateTo("/")
};
</script>

<template>
	<div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="../../assets/images/profile.jpeg" />
        </div>
      </label>
      <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <!-- <li> -->
          <!-- <NuxtLink class="justify-between" to="/profile"> -->
            <!-- Profile -->
          <!-- </NuxtLink> -->
        <!-- </li> -->
        <li><NuxtLink to ="/settings">Settings</NuxtLink></li>
        <li>
          <a @click="logout">Logout</a>
        </li>
      </ul>
    </div>
</template>
<script setup lang="ts">
// Habe im Moment kein Client modul
import client from "../../plugins/auth/client.js";
const router = useRouter();

let user: any;

if(process.client) {
  user = client.getUserLS();
}

const logout = async () => {
  await client.logout();
  await navigateTo("/auth")
};
</script>

<template>
	<div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <template v-if="user">
              <img :src="user.imagePath" alt="user-profile" />
          </template>
          <template v-else>
            <img src="../../assets/images/dummy-user.jpg" />
          </template>
        </div>
      </label>
      <ul v-if="user" tabindex="0" class="z-40 mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
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
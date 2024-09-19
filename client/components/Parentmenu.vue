<script setup lang="ts">
import { menuLinks } from '~/data/MenuRoutes.js';
</script>

<template>
    <div class="dropdown hidden sm:block">
        <!-- dropdown-end dropdown-hover-->
        <label tabindex="0" class="btn btn-ghost flex">
            Menu
            <svg
                class="mt-0.5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
            >
                <path
                    d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                />
            </svg>
        </label>
        <ul
            tabindex="0"
            class="dropdown-content menu p-2 menu-compact shadow bg-base-100 rounded-box w-48 z-20"
        >
            <li>
                <NuxtLink to="/"> Dashboard </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/tech"> Techstack </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/profile"> Profile </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/settings"> Settings </NuxtLink>
            </li>
            <div class="divider py-0 my-0"></div>
            <li>
                <button class="" onclick="add_project_modal.showModal()">
                    Create Project
                </button>
            </li>
            <li>
                <button class="" onclick="add_tech_modal.showModal()">
                    Add Tech
                </button>
            </li>
        </ul>
    </div>
</template>

<style>
/*.activeLink {
    --tw-border-opacity: 1;
    border-color: hsl(var(--p) / var(--tw-border-opacity));
    --tw-bg-opacity: 1;
    background-color: hsl(var(--p) / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: hsl(var(--pc) / var(--tw-text-opacity));
}*/
</style>

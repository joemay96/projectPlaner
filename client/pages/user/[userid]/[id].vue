<script setup lang="ts">
const { $client } = useNuxtApp();

const techStore = useTech();
const projectStore = useProject();
const route = useRoute();

definePageMeta({
    middleware: ['no-auth'],
    layout: 'public',
});

const projectId = route.params.id;
const ppinfoid = route.params.userid;
const pj = projectStore.getProjectById(projectId);
//@ts-ignore
const u = await $client.client?.collection('pp_userinfo').getOne(ppinfoid);
console.log(u);

let imgUrl = '';
if (u) {
    imgUrl = `${$client.getUrl()}/api/files/${u.collectionId}/${u.id}/${
        u.avatar
    }`;
}
</script>

<template>
    <!-- TODO: here has to be some info about the person, maybe the option to go back etc. -->
    <div class="flex">
        <div class="mt-12 flex flex-col items-center mx-6">
            <div class="avatar">
                <!-- rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 -->
                <div class="max-w-40">
                    <img
                        :src="imgUrl"
                        class="mask mask-squircle"
                        id="avatarImage"
                    />
                </div>
            </div>
            <p class="mt-4 font-bold text-lg">{{ u.f_name }} {{ u.l_name }}</p>
            <div class="my-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                </svg>
                <a
                    class="text-primary hover:underline"
                    :href="u.website"
                    target="_blank"
                >
                    {{ u.website }}
                </a>
            </div>

            <p class="my-4 text-lg font-bold">More projects</p>

            <NuxtLink
                :to="`/user/${ppinfoid}`"
                class="btn btn-outline btn-secondary"
                >Back to profile</NuxtLink
            >
        </div>
        <div class="flex flex-col items-center">
            <PublicProjectDisplay
                :id="pj.id"
                :userid="pj.userid"
                :title="pj.title"
                :description="pj.description"
                :motivation="pj.motivation"
                :workEstimation="pj.workEstimation"
                :tags="pj.tags"
                :techStack="pj.techStack"
                :fullTechList="techStore.getTechs"
                :created="new Date(pj.created)"
                :updated="new Date(pj.updated)"
                :github_link="pj.github_link"
                :link="pj.website"
            />
        </div>
    </div>
</template>

<style scoped>
.xside {
    pointer-events: none;
    position: fixed;
    inset-inline-start: 0px;
    top: 10%;
    background-color: blue;
    grid-column-start: 1;
    grid-row-start: 1;
    display: grid;
    width: 25%;
    /* grid-template-columns: repeat(1, minmax(0, 1fr)); */
    /* grid-template-rows: repeat(1, minmax(0, 1fr)); */
    align-items: flex-start;
    justify-items: start;
    overflow-x: hidden;
    overflow-y: hidden;
    overscroll-behavior: contain;
    height: 80vh;
    height: 80dvh;
}
</style>

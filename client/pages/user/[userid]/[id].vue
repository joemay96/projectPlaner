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
//@ts-ignore
const projects = await $client.getUserProjects(u.userid, 'show=True');

let imgUrl = '';
if (u) {
    imgUrl = `${$client.getUrl()}/api/files/${u.collectionId}/${u.id}/${
        u.avatar
    }`;
}
</script>

<template>
    <div class="flex align-center">
        <!-- TODO: here has to be some info about the person, maybe the option to go back etc. -->
        <div
            class="mt-10 pt-4 mb-2 flex flex-col items-center w-56 rounded-xl px-6 shadow-2xl bg-base-200 h-3/4 pb-10"
        >
            <div class="flex flex-col items-center">
                <p class="my-4 font-bold text-lg">
                    {{ u.f_name }} {{ u.l_name }}
                </p>
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

                <div class="mt-4 mb-1 flex hover:text-primary hover:underline">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5 mr-1 hover:cursor-pointer"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                        />
                    </svg>
                    <a class="" :href="u.website" target="_blank">
                        {{ u.website }}
                    </a>
                </div>
            </div>

            <div class="flex flex-col items-center">
                <p class="my-4 text-lg font-bold">More projects</p>

                <div v-for="p in projects.items" :key="p.id" class="">
                    <NuxtLink
                        v-if="p.id != projectId"
                        :to="`/user/${ppinfoid}/${p.id}`"
                        class="hover:text-accent hover:underline text-md"
                    >
                        {{ p.title }}
                    </NuxtLink>
                </div>
            </div>

            <NuxtLink
                :to="`/user/${ppinfoid}`"
                class="btn btn-ghost mt-12 hover:text-primary"
            >
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
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </svg>
                To Profile
            </NuxtLink>
        </div>
        <div class="flex flex-col w-full items-center lg:pr-56">
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

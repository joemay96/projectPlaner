<script setup lang="ts">
// const techStore = useTech();
// const projectStore = useProject();
const { $client } = useNuxtApp();
const route = useRoute();

definePageMeta({
    middleware: ['no-auth'],
    pageTransition: false,
    layoutTransition: false,
    layout: 'public',
});

const id = route.params.id;

// @ts-ignore
const u = await $client.client?.collection('pp_userinfo').getOne(id);
const userid = u.userid;
// @ts-ignore
const projects = await $client.getUserProjects(userid, 'show=True');
const tech = await $client.getUserTech(userid);
let techList: any[] = [];

projects.items.forEach((p: any) => {
    p.techStack.forEach(async (t: String) => {
        try {
            const tech = await $client.getTechById(t);
            techList.push(tech);
        } catch (error) {
            console.error(
                'Can not fetch tech with id: ' + t + ' Error: ' + error,
            );
        }
    });
});

const techStack: any = [];
projects.items.forEach((p: any) => {
    const stack: String[] = [];
    p.techStack?.forEach((id: String) => {
        stack.push(techList?.filter((item: any) => item.id === id)[0]);
    });
});

let imgUrl = '';
if (u) {
    imgUrl = `${$client.getUrl()}/api/files/${u.collectionId}/${u.id}/${
        u.avatar
    }`;
}

console.log('TechStack: ', techStack);

let imgBasePath: String = `${$client.getUrl()}/api/files`;
</script>

<template>
    <h1 class="text-3xl text-center md:pt-12 pt-4 font-bold">
        Welcome to
        <span class="text-primary">{{ u.f_name }} {{ u.l_name }}</span
        >'s Profile
    </h1>
    <div
        class="sm:flex block flex-row justify-around align-center md:px-20 px-2 flex-1 mt-12 mb-12"
    >
        <div class="sm:flex justify-center flex-col">
            <p class="my-1">
                <span class="font-bold mr-2">Website:</span>
                <a
                    class="text-primary hover:underline"
                    :href="u.website"
                    target="_blank"
                    >{{ u.website }}</a
                >
            </p>
            <p class="my-1">
                <span class="mr-2 font-bold">Reachable via:</span>
                {{ u.contact_info }}
            </p>
            <p class="my-1">
                <span class="font-bold mr-2">Current project:</span>:
                {{ u.status }}
            </p>
            <p class="mt-1 mb-2">
                <span class="font-bold mr-2">Interests:</span> {{ u.interests }}
            </p>
            <p class="my-1">{{ u.info }}</p>
        </div>
        <div class="md:pl-12 sm:pl-4 md:mr-20 mr-2 avatar">
            <!-- rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 -->
            <div class="max-w-80">
                <img
                    :src="imgUrl"
                    class="mask mask-squircle"
                    id="avatarImage"
                />
            </div>
        </div>
    </div>
    <div class="flex justify-center">
        <h2 class="text-3xl text-secondary font-extrabold pb-8">Projects</h2>
    </div>
    <div
        class="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4 md:px-20 px-2 flex-1 justify-around"
        v-auto-animate
    >
        <template v-for="p in projects.items" key="p.id">
            <!-- @ts-ignore -->
            <PublicProjectCard
                :id="p.id"
                :userid="id"
                :title="p.title"
                :description="p.description"
                :motivation="p.motivation"
                :techStack="p.techStack"
                :fullTechList="techStack"
                :tags="p.tags"
            />
        </template>
    </div>
    <div class="flex justify-center">
        <h2 class="text-3xl text-secondary font-extrabold py-8">Techstack</h2>
    </div>
    <div
        class="grid grid-cols-2 xl:grid-cols-8 lg:grid-cols-5 sm:grid-cols-4 gap-4 px-8 md:px-20 flex-1 justify-around pb-8"
    >
        <template v-for="t in tech.items" :key="t.id">
            <UserTechCard
                :id="t.id"
                :name="t.name"
                :area="t.area"
                :url="t.url"
                :imageBasePath="
                    `${imgBasePath}/${t.collectionId}/${t.id}` || ''
                "
                :image="t.image"
            />
        </template>
    </div>
</template>

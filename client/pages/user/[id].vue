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

const u = await $client.client.collection('pp_userinfo').getOne(id, {});
const userid = u.userid;
const projects = await $client.getUserProjects(userid);
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

console.log('TechStack: ', techStack);

let imgBasePath: String = `${$client.getUrl()}/api/files`;
</script>

<template>
    <h1 class="text-2xl text-center md:pt-12 pt-4 font-bold">
        Welcome to {{ u.f_name }} {{ u.l_name }}'s Profile
    </h1>
    <p class="mx-auto my-5">{{ u.info }}</p>
    <div class="flex flex-col">
        <p class="mx-auto my-5">Website: {{ u.website }}</p>

        <p class="mx-auto my-5">Interests: {{ u.interests }}</p>
        <p class="mx-auto my-5">Reach me via: {{ u.contact_info }}</p>
        <p class="mx-auto my-5">I am currently: {{ u.status }}</p>
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
            <UserProjectCard
                :id="p.id"
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
        class="grid grid-cols-2 xl:grid-cols-8 lg:grid-cols-5 sm:grid-cols-4 gap-4 px-8 md:px-20 flex-1 justify-around"
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

<script setup lang="ts">
const props = defineProps({
    id: String,
    imageBasePath: '',
    name: String,
    area: String,
    url: String,
    image: String,
});

const { id, imageBasePath, name, area, url, image } = props;

// set image path
let imageUrl = '';
if (imageBasePath && imageBasePath != '' && image != '') {
    imageUrl = imageBasePath + '/' + image;
} else {
    imageUrl = new URL('../assets/images/tech/default.jpg', import.meta.url)
        .href;
}

function searchTech() {
    if (url && url != '') {
        console.log(url);
        window.open(url, '_blank')?.focus();
    } else {
        window
            .open(`https://duckduckgo.com/?q=${name}&ia=web`, '_blank')
            ?.focus();
    }
}
</script>

<template>
    <div class="card card-compact bg-base-100 shadow-xl">
        <figure class="" @click="searchTech()">
            <img :src="imageUrl" class="w-full" alt="TechStack" />
        </figure>
        <div class="card-body">
            <div
                v-if="url"
                class="tooltip tooltip-top tooltip-secondary"
                :data-tip="url"
            >
                <h2
                    class="card-title hover:cursor-pointer hover:text-secondary hover:underline"
                    @click="searchTech()"
                >
                    {{ name }}
                </h2>
            </div>
            <h2
                v-else
                class="card-title hover:cursor-pointer hover:text-secondary hover:underline"
                @click="searchTech()"
            >
                {{ name }}
            </h2>
            <!-- <a v-if="url" :href="url" target="_blank" class="link link-secondary">{{ url }}</a> -->
            <p class="">{{ area }}</p>
        </div>
    </div>
</template>

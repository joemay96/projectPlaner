<script setup lang="ts">
const props = defineProps({
    name: String,
    id: String,
});
const { name, id } = props;

const picValue = Math.floor(Math.random() * 4 + 1);
</script>

<template>
    <div
        class="bg-base-100 shadow-lg rounded-md cursor-default hover:text-accent hover:font-bold"
    >
        <div class="p-2">
            <div class="">{{ name }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['closeAlert']);

const props = defineProps({
    //@ts-ignoref
    show: ref(),
    message: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        default: 2000,
    },
});

const { duration } = props;

const propsRef = toRefs(props);
const showRef = propsRef.show;
const messageRef = propsRef.message;

watch(showRef, (newVal, oldVal) => {
    // newVal is true and should show the alert
    if (newVal) {
        showAlert();
    }
});

function showAlert() {
    setTimeout(resetShow, duration);
}

function resetShow() {
    // showRef.value = false; -> geht nicht, da ready only -> trigger emit to parent
    emit('closeAlert');
}
</script>

<template>
    <div v-if="showRef" class="flex justify-center">
        <div
            class="alert alert-success w-full max-w-2xl fixed top-10 alert-animation z-50"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span>{{ messageRef }}</span>
            <div>
                <button
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.alert-animation {
    animation-name: alertAnim;
    animation-duration: 0.4s;
    animation-timing-function: ease-in-out;
}

@keyframes alertAnim {
    0% {
        top: 0;
    }
    100% {
        top: 2.5rem;
    }
}
</style>

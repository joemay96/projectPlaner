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
    console.log(newVal, oldVal);
});

function showAlert() {
    setTimeout(resetShow, duration);
}

function resetShow() {
    console.log('trigger reset');
    // showRef.value = false; -> geht nicht, da ready only -> trigger emit to parent
    emit('closeAlert');
}
</script>

<template>
    <div v-if="showRef" class="flex justify-center">
        <div class="alert alert-error w-full max-w-2xl fixed top-10">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            </svg>
            <span>{{ messageRef }}</span>
            <div>
                <button
                    class="btn btn-sm btn-circle btn-ghost"
                    @click="resetShow"
                >
                    ✕
                </button>
            </div>
        </div>
    </div>
</template>

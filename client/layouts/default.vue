<setup lang="ts"></setup>

<template>
    <!-- <utilsVisualToast message="Hallo1" /> -->
    <utilsAppContainer>
        <utilsAppHeader />
        <slot />
    </utilsAppContainer>
    <!-- <utilsFooter /> -->
</template>

<style global>
:root {
    --color-grad-slider-1: #3c3b3f;
    --color-grad-slider-2: #605c3c;

    --color-grad-back-1: #f1f5fd;
    --color-grad-back-2: #f8f8f8;
}

html {
    /* height: 100%; */
    scroll-behavior: smooth;
}

/* changing the scrollbar */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: var(--bg);
    /* box-shadow: inset 0 0 5px; grey; */
    border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: hsl(var(--n));
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--nf));
}

.gradient-bg-slider {
    background: linear-gradient(
        90deg,
        var(--color-grad-slider-1) 50%,
        var(--color-grad-slider-2) 100%
    );
}

.gradient-bg {
    background: linear-gradient(
        45deg,
        var(--color-grad-back-1) 80%,
        var(--color-grad-back-2) 100%
    );
}
</style>

<template>
    <utilsAppContainer>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </utilsAppContainer>
</template>

<style global>
/* Code for page transitions */
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    transform: translate(50px, 0);
}
/* transform: rotate3d(1, 1, 1, 15deg); */
</style>

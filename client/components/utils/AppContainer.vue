<script setup lang="ts">
const {
    $resetSuccessAlert,
    $resetErrorAlert,
    $alertMessage,
    $showSuccessAlert,
    $showErrorAlert,
} = useNuxtApp();
</script>

<template>
    <UtilsAlertsErrorAlert
        :message="$alertMessage"
        :show="$showErrorAlert"
        @closeAlert="$resetErrorAlert"
    />
    <UtilsAlertsSuccessAlert
        :message="$alertMessage"
        :show="$showSuccessAlert"
        @closeAlert="$resetSuccessAlert"
    />
    <div class="bg-base-100">
        <slot />
    </div>
</template>

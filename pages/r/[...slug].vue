<template>
    <mutedit-app />
</template>

<script setup>
useHead({
    title: "sub page",
});
</script>


<script>
definePageMeta({
    middleware: "sub-redirect",
});
</script>

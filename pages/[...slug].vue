

<template>
    <mutedit-app />
</template>

<script setup>
useHead({
    title: "front page",
});
</script>


<script>
definePageMeta({
    middleware: "front-redirect",
});
</script>

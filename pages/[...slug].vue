<!-- This page catches any requests that look like /anything/anything/anything -->
<!-- The middleware 'front-redirect' will enforce a proper url path -->


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

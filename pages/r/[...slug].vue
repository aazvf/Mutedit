<!-- This page catches any requests that look like /r/anything/anything/anything -->
<!-- The middleware 'sub-redirect' will enforce a proper url path -->

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

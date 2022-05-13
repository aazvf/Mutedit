
<template>
    <div>
        <h1>Sort RRRRR {{ sort }}</h1>
        <h1>Time {{ time }}</h1>
        <p>{{ $route.params.slug }}</p>
        <p>{{ $route.params.slug[3] }}</p>
    </div>
</template>



<script>
definePageMeta({
    middleware: "sub-redirect",
});

export default {
    data() {
        return {
            sort: this.$route.params.slug[0],
            time: this.$route.params.slug[1],
            type: this.$route.params.slug[2],
        };
    },
    // page properties go here
};
</script>



<template>
    <article-feed :sort="sort" :timeperiod="time" />
</template>

<script setup>
useHead({
    title: "front page",
});
</script>


<script>
import ArticleFeed from "~/components/ArticleFeed.vue";
definePageMeta({
    middleware: "front-redirect",
});
export default {
    components: { ArticleFeed },
    mounted() {},
    data() {
        return {
            sort: this.$route.params.slug[0] || "best",
            time: this.$route.params.slug[1] || "day",
            type: this.$route.params.slug[2],
        };
    },
    // page properties go here
};
</script>

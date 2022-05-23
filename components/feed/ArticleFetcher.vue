<template>
    <div class="text-center m-6 p-6">
        <tailwind-spinner v-if="waitingForArticles" />
        <tailwind-button
            theme="focused"
            v-if="!waitingForArticles"
            v-on:click="$fetchArticles()"
        >Load More</tailwind-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            waitingForArticles: useWaitingForArticles(),
        };
    },
    mounted() {
        this.$fetchArticles(true);
    },
    methods: {
        fetchArticles() {
            console.log("fetching articles");
            this.$fetchArticles();
        },
    },
};
</script>

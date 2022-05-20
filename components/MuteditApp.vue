<template>
    <div>
        <div>
            <header-menu />
            <hr />
            <div class="mx-3 my-1">
                <pills-feed-sort />
            </div>
            <div class="mx-3 my-1" v-if="['top', 'controversial'].includes(sort)">
                <pills-feed-time />
            </div>
            <hr />
            <div class="mx-3 my-1">
                <pills-feed-type />
            </div>
            <hr />
            <div class="mx-3 my-1">
                <pills-subreddits />
            </div>
            <pills-words />
            <feed-status-text />
            <div class="mx-3 my-1">
                <feed-toggle-options />
            </div>
        </div>
        <hr class="mb-2 mt-1" />
        <floating-muter />
        <feed-filtered-articles />
        <feed-article-fetcher />
    </div>
</template>

<script>
export default defineComponent({
    name: "Mutedit Layout",
    data() {
        return {
            sort: useFeedSortParam(),
        };
    },
    mounted() {
        this.$localstorage.restoreAll();
    },
});
</script>

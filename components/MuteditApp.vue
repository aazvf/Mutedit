<template>
    <div>
        <div class="select-none">
            <!-- <header-menu /> -->
            <tailwind-hr />
            <div class="mx-3 my-1">
                <pills-feed-sort />
            </div>
            <div class="mx-3 my-1" v-if="['top', 'controversial'].includes(sort)">
                <pills-feed-time />
            </div>
            <tailwind-hr />
            <div class="mx-3 my-1">
                <pills-feed-type />
            </div>
            <!-- <tailwind-hr /> -->
            <feed-description />

            <pills-subreddits />
            <tailwind-hr />
            <pills-words />
            <feed-status-text />
            <div class="mx-3 mt-3 mb-1">
                <feed-toggle-options />
            </div>
        </div>
        <tailwind-hr class="mb-4 mt-1" />
        <floating-muter />
        <div :class="feedColumns">
            <feed-filtered-articles />
        </div>
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
    computed: {
        feedColumns() {
            // return "grid grid-cols-3 shrink";
            const c = this.$theme().columns;
            return `columns-1 lg:columns-${+c + 1}`;
        },
    },
    mounted() {},
});
</script>

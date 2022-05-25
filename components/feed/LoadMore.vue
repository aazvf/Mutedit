<template>
    <div class="text-center m-10 p-6" ref="toggle">
        <tailwind-spinner v-if="waitingForArticles" />
        <tailwind-toggle
            v-if="!waitingForArticles"
            theme="focused"
            :value="autoLoadMore"
            v-on:toggle="onAutoLoadToggle"
        >auto load articles</tailwind-toggle>
        <tailwind-badge
            theme="focused"
            v-if="!waitingForArticles && !autoLoadMore"
            class="px-5 py-6 text-xl shadow-lg block mt-8"
            v-on:click="$fetchArticles()"
        >fetch more articles</tailwind-badge>
    </div>
</template>

<script>
export default {
    name: "Load more articles button",
    data() {
        const { autoLoadMore } = useFeedFilters();
        return {
            ...{ autoLoadMore },
            waitingForArticles: useWaitingForArticles(),
            observer: null,
        };
    },
    mounted() {
        this.observer = new IntersectionObserver(this.onObserve);
        this.$fetchArticles(true);
    },
    methods: {
        fetchArticles() {
            this.$fetchArticles();
        },
        onAutoLoadToggle() {
            this.autoLoadMore = !this.autoLoadMore;
            if (this.autoLoadMore) {
                this.waitForSeenAgain();
            } else {
                this.observer.unobserve(this.$refs.toggle);
            }
        },
        waitForSeenAgain() {
            this.observer.observe(this.$refs.toggle);
        },
        onObserve(entries, observer) {
            // This runs when the element comes into view
            const entry = entries[0];
            this.ratio = entry.intersectionRatio;
            if (entry.intersectionRatio > 0) {
                observer.disconnect();
                if (this.autoLoadMore) {
                    this.fetchArticles();
                }
                setTimeout(() => {
                    if (this.autoLoadMore) {
                        this.waitForSeenAgain();
                    }
                }, 10000);
            }
        },
    },
};
</script>

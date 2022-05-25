<template>
    <tailwind-card>
        <div ref="content" v-if="!scrolledPast">
            <article-title-meta-info :article="article" />
            <article-title :article="article" />
            <article-media :article="article" />
            <div class="px-1 pb-2 leading-7">
                <article-comments-fetch-buttons :article="article" />

                <article-meta-badges :article="article" />
            </div>
            <article-comments :article="article" class="mb-1" />
        </div>
        <div v-if="scrolledPast">
            <tailwind-badge theme="focused" v-on:click="scrolledPast = false">auto hidden (show)</tailwind-badge>
            <span class="text-xs">
                <span :class="$theme().text3">[{{ article.data.subreddit.toLowerCase() }}]</span>
                {{ article.data.title.substr(0,30) }}{{ article.data.title.length > 30 ? '...' : '' }}
            </span>
        </div>
    </tailwind-card>
</template>



<script>
export default {
    name: "Article layout",
    props: {
        article: { type: Object, default: {} },
    },
    data() {
        const { blocked } = useFeedFilters();
        return {
            ...{ blocked },
            theme: useTheme(),
            scrolledPast: false,
            ratio: 0,
            observer: new IntersectionObserver(this.onObserve),
        };
    },

    mounted() {
        if (this.theme.hideAfterSeen) {
            this.waitForArticle();
        }
    },
    computed: {},

    methods: {
        // These next couple methods will use IntersectionObserver to wait
        //  for the article to enter the viewport. then it starts watching
        //  scroll events once the article is visible. it will mark the
        //  article as 'seen' if it scrolls past, but not if we scroll back up.
        waitForArticle() {
            this.observer.observe(this.$refs.content);
        },
        watchScroll() {
            if (!this.scrolledPast) {
                window.addEventListener("scroll", this.onScroll);
            }
        },
        stopWatchingScroll() {
            window.removeEventListener("scroll", this.onScroll);
        },

        onScroll() {
            // Triggers on scroll after article enters viewport

            if (this.$refs.content === null || !this.theme.hideAfterSeen) {
                return this.stopWatchingScroll();
            }

            const { top, height } = this.$refs.content.getBoundingClientRect();
            const { innerHeight } = window;

            // If scrolled enough past the bottom of article
            if (top + height * 2 < 0) {
                this.stopWatchingScroll();
                setTimeout(this.blockArticleDelayed, 5000);
            }
            // If scrolled back up and article is out of view again
            if (top > innerHeight) {
                this.stopWatchingScroll();
                this.waitForArticle();
            }
        },
        onObserve(entries, observer) {
            // This runs when the element comes into view
            const entry = entries[0];
            this.ratio = entry.intersectionRatio;
            if (entry.intersectionRatio > 0) {
                observer.disconnect();
                this.watchScroll();
                this.article.seen = true;
            }
        },
        blockArticleDelayed() {
            if (this.$refs.content === null) {
                return;
            }

            const { top, height } = this.$refs.content.getBoundingClientRect();

            // check again if scrolled past the bottom of article
            if (top + height * 2 < 0) {
                this.scrolledPast = true;
                // if (!this.blocked.includes(this.article.data.id)) {
                //     this.blocked.push(this.article.data.id);
                // }
            } else {
                this.waitForArticle();
            }
        },
    },
};
</script>

<template>
    <tailwind-card>
        <div ref="content">
            <article-title-meta-info :article="article" />

            <article-title :article="article" />

            <article-media :article="article" />

            <div class="px-1 pb-2 leading-7">
                <article-comments-fetch-buttons :article="article" />

                <article-meta-badges :article="article" />
            </div>
            <article-comments :article="article" class="mb-1" />
        </div>
    </tailwind-card>
</template>



<script>
export default {
    name: "Article Container",
    props: {
        article: { type: Object, default: {} },
    },
    data() {
        const { blocked, hideAfterSeen } = useFeedFilters();
        return {
            ...{ blocked, hideAfterSeen },
            scrolledPast: false,
            ratio: 0,
            observer: new IntersectionObserver(this.onObserve),
        };
    },

    mounted() {
        if (this.hideAfterSeen) {
            this.waitForArticle();
        }
    },

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

            if (this.$refs.content === null || !this.hideAfterSeen) {
                return this.stopWatchingScroll();
            }

            const { scrollY, innerHeight } = window;
            const { offsetTop, offsetHeight } = this.$refs.content;

            // If scrolled enough past the bottom of article
            if (scrollY > offsetTop + offsetHeight + innerHeight) {
                this.stopWatchingScroll();
                setTimeout(this.blockArticleDelayed, 5000);
            }
            // If scrolled back up and article is out of view again
            if (offsetTop > scrollY + innerHeight) {
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
            }
        },
        blockArticleDelayed() {
            if (this.$refs.content === null) {
                return;
            }

            const { scrollY } = window;
            const { offsetTop, offsetHeight } = this.$refs.content;

            // check again if scrolled past the bottom of article
            if (scrollY > offsetTop + offsetHeight) {
                this.scrolledPast = true;
                if (!this.blocked.includes(this.article.data.id)) {
                    this.blocked.push(this.article.data.id);
                }
            } else {
                this.waitForArticle();
            }
        },
    },
};
</script>

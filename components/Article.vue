<template>
    <tailwind-card>
        <div ref="content">
            <h1
                :class="scrolledPast ? 'dark:text-purple-400' : 'dark:text-red-400'"
            >{{ ratio }} {{ scrolledPast }}</h1>
            <article-meta-title :article="article" />

            <article-title :article="article" />

            <article-media-display :article="article" v-if="!article.isText" />
            <article-text-display :article="article" v-if="article.isText" />
            <article-external-link :article="article" v-if="article.isLink" />
            <comment-list
                :comments="article.comments"
                v-if="article.comments.length > 0"
                class="mb-3"
            />

            <tailwind-spinner theme="pink" v-if="article.loadingComments" />
            <div ref="title">
                <article-comments-buttons :article="article" />

                <tailwind-badge
                    :theme="seen ? 'green' : 'pink'"
                >{{ $abbreviateNumber(article.data.score) }}</tailwind-badge>
            </div>
        </div>
    </tailwind-card>
</template>



<script>
export default {
    props: {
        article: { type: Object, default: {} },
    },
    data() {
        return {
            seen: false,
            scrolledPast: false,
            ratio: 0,
            observer: new IntersectionObserver(this.onObserve),
        };
    },

    mounted() {
        this.waitForArticle();
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

            if (this.$refs.content === null) {
                return this.stopWatchingScroll();
            }

            const { scrollY, innerHeight } = window;
            const { offsetTop, offsetHeight } = this.$refs.content;

            // If scrolled past the bottom of article
            if (scrollY > offsetTop + offsetHeight) {
                this.stopWatchingScroll();
                this.scrolledPast = true;
                this.$parent.blocked.push(this.article.data.id);
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
    },
};
</script>

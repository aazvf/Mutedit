<template>
    <tailwind-card>
        <div ref="content">
            <article-meta-title :article="article" />

            <article-title :article="article" />

            <!-- <article-media :article="article" v-if="!article.isText" /> -->
            <article-media-display :article="article" v-if="!article.isText" />
            <article-media-text :article="article" v-if="article.isText" />
            <article-media-link :article="article" v-if="article.isLink" />
            <article-comments-display
                :comments="article.comments"
                v-if="article.comments.length > 0"
                class="mb-3"
            />

            <tailwind-spinner theme="pink" v-if="article.loadingComments" />
            <div class="px-1 pb-2">
                <article-comments-fetch-buttons :article="article" />

                <tailwind-badge theme="pink">score: {{ $abbreviateNumber(article.data.score) }}</tailwind-badge>
                <tailwind-badge
                    theme="purple"
                >comments: {{ $abbreviateNumber(article.data.num_comments) }}</tailwind-badge>

                <tailwind-badge
                    v-if="article.data.num_crossposts > 0"
                    theme="purple"
                >crossposts: {{ $abbreviateNumber(article.data.num_crossposts) }}</tailwind-badge>

                <tailwind-badge v-if="article.data.archived" theme="red">archived</tailwind-badge>

                <tailwind-badge v-if="article.data.locked" theme="red">locked</tailwind-badge>

                <tailwind-badge v-if="article.data.quarantine" theme="red">quarantined</tailwind-badge>
                <tailwind-badge v-if="article.data.spoiler" theme="red">spoilers</tailwind-badge>
                <tailwind-badge v-if="article.data.stickied" theme="red">stickied</tailwind-badge>
                <tailwind-badge v-if="article.data.pinned" theme="red">pinned</tailwind-badge>
                <tailwind-badge theme="red" v-if="article.data.over_18">NSFW</tailwind-badge>

                <tailwind-badge
                    v-if="article.data.removal_reason"
                    theme="red"
                >removal_reason: {{ article.data.removal_reason }}</tailwind-badge>
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
        const { blocked } = useFeedFilters();
        return {
            ...{ blocked },
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
                setTimeout(this.blockArticleDelayed, 5000);
                // this.scrolledPast = true;
                // if (!this.blocked.includes(this.article.data.id)) {
                //     this.blocked.push(this.article.data.id);
                // }
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
                console.log("article back in view so watching again");
                this.waitForArticle();
            }
        },
    },
};
</script>

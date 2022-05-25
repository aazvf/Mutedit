<template>
    <div>
        <div ref="content">
            <slot name="content" ref="content" v-if="!scrolledPast" />
        </div>
        <div v-if="scrolledPast">
            <tailwind-badge theme="focused" v-on:click="scrolledPast = false">auto hidden (show)</tailwind-badge>
            <span class="text-xs">
                <slot name="message" />
            </span>
        </div>
    </div>
</template>


<script>
// Shows the content slot, and if the user scrolls far enough past, then
//     the contents are replaced with the 'replace' slot
export default {
    name: "Scrolled past watcher",
    props: { enabled: { type: Boolean, default: true, required: false } },

    data() {
        const { blocked } = useFeedFilters();
        return {
            ...{ blocked },
            scrolledPast: false,
            observer: null,
        };
    },

    mounted() {
        this.enable();
    },

    methods: {
        // Start observing
        enable() {
            this.observer = new IntersectionObserver(this.onObserve);
            this.waitForArticle();
        },
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

            if (this.$refs.content === null || !this.enabled) {
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
            if (entry.intersectionRatio > 0) {
                observer.disconnect();
                this.watchScroll();
                this.$emit("seen");
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
            } else {
                this.waitForArticle();
            }
        },
    },
};
</script>

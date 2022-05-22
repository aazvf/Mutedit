<template>
    <div class="mx-3 my-1 leading-7 pb-1">
        <span :class="['px-1', theme.text3]">mute subreddits:</span>
        <span :class="['px-1', theme.text2]" v-if="count === 0">loading...</span>
        <tailwind-badge
            v-for="(subreddit, index) in subredditmapsorted"
            :key="index"
            v-on:click="onClickSubreddit(subreddit.name)"
            :theme="badgeTheme(subreddit)"
            v-show="subreddit.count > 0"
        >/r/{{ $ucfirst(subreddit.name) }} ({{ subreddit.count }})</tailwind-badge>
        <tailwind-badge
            theme="bordered"
            v-on:click="limit += take ; take *= 1.5"
            v-if="count > limit"
        >show {{ parseInt(count - limit) }} more subreddits</tailwind-badge>
    </div>
</template>

<script>
export default {
    data() {
        return {
            theme: useTheme(),
            ...useFeedFilters(),
            limit: 30,
            take: 20,
            articles: useArticles(),
        };
    },
    computed: {
        count() {
            return Object.keys(this.subredditmap).length;
        },
        subredditmapsorted() {
            const map = this.subredditmap;
            return Object.keys(map)
                .map((s) => {
                    return { name: s, count: map[s].length - 1 };
                })
                .sort((a, b) => b.count - a.count)
                .splice(0, this.limit);
        },
        subredditmap() {
            const map = {};
            this.articles.forEach((a) => {
                const s = a.data.subreddit;
                map[s] =
                    typeof map[s] === "object"
                        ? [...map[s], a.data.id]
                        : [s, a.data.id];
            });
            return map;
        },
    },
    methods: {
        badgeTheme(subreddit) {
            return this.focusSubreddit === subreddit.name
                ? "focused"
                : this.isSubredditMuted(subreddit.name)
                ? "active"
                : "inactive";
        },
        isSubredditMuted(subreddit) {
            return this.mutedSubs.includes(subreddit);
        },

        onClickSubreddit(subreddit) {
            const isMuted = this.isSubredditMuted(subreddit);
            const isFeatured = this.focusSubreddit === subreddit;

            if (!isMuted && !isFeatured) {
                this.mutedSubs.push(subreddit);
                this.$localstorage.saveMutedSubs();
            }

            if (isMuted && !isFeatured) {
                this.focusSubreddit = subreddit;
            }

            if (isFeatured) {
                this.focusSubreddit = "";
                this.mutedSubs = this.mutedSubs.filter((r) => r != subreddit);
                this.$localstorage.saveMutedSubs();
            }
        },
    },
    mounted() {
        console.log("PillsSubreddit Component mounted.");
    },
};
</script>

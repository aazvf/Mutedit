<template>
    <div class="p-3 leading-7">
        <span class="px-1 mr-1" :class="$theme.text3">mute subreddits:</span>
        <span class="px-1" :class="$theme.text2" v-if="count === 0">loading...</span>
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
    name: "Mute-able subs list ",
    data() {
        return {
            ...useFeedFilters(),
            limit: 10,
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
            if (this.isSubredditMuted(subreddit)) {
                this.mutedSubs = this.mutedSubs.filter((r) => r != subreddit);
            } else {
                this.mutedSubs.push(subreddit);
            }

            this.$localstorage.saveMutedSubs();
        },
    },
};
</script>

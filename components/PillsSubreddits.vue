<template>
    <div>
        <tailwind-badge
            v-for="(subreddit, index) in subredditmapsorted"
            :key="index"
            v-on:click="onClickSubreddit(subreddit.name)"
            :theme="badgeTheme(subreddit)"
            v-show="subreddit.count > 0"
        >/r/{{ $ucfirst(subreddit.name) }} ({{ subreddit.count }})</tailwind-badge>
        <tailwind-badge
            theme="purple"
            v-on:click="showsubredditlimit += showsubredditbite ; showsubredditbite *= 1.5"
            v-if="subredditcount > showsubredditlimit"
        >show {{ parseInt(subredditcount - showsubredditlimit) }} more subreddits</tailwind-badge>
    </div>
</template>

<script>
import localforage from "localforage";

export default {
    data() {
        const { focusSubreddit } = useFeedFilters();
        return {
            showsubredditlimit: 10,
            showsubredditbite: 20,

            showsubreddit: focusSubreddit,
            subredditRulesStrings: useFeedSubredditPrefs(),
        };
    },
    computed: {
        subredditcount() {
            return Object.keys(this.subredditmap).length;
        },
        subredditmapsorted() {
            const map = this.subredditmap;
            return Object.keys(map)
                .map((s) => {
                    return { name: s, count: map[s].length - 1 };
                })
                .sort((a, b) => b.count - a.count)
                .splice(0, this.showsubredditlimit);
        },
        subredditmap() {
            const map = {};
            this.$parent.articles.forEach((a) => {
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
            return this.showsubreddit === subreddit.name
                ? "green"
                : this.isSubredditMuted(subreddit.name)
                ? "red"
                : "default";
        },
        isSubredditMuted(subreddit) {
            return this.subredditRulesStrings.indexOf(subreddit) > -1;
        },

        onClickSubreddit(subreddit) {
            const isMuted = this.isSubredditMuted(subreddit);
            const isFeatured = this.showsubreddit === subreddit;

            if (!isMuted && !isFeatured) {
                this.subredditRulesStrings.push(subreddit);
                this.saveSubredditRules();
            }

            if (isMuted && !isFeatured) {
                this.showsubreddit = subreddit;
            }

            if (isFeatured) {
                this.showsubreddit = "";
                this.subredditRulesStrings = this.subredditRulesStrings.filter(
                    (r) => r != subreddit
                );
                this.saveSubredditRules();
            }
        },
        saveSubredditRules() {
            localforage.setItem(
                "subreddit-rules",
                JSON.stringify(this.subredditRulesStrings)
            );
        },
    },
    mounted() {
        console.log("PillsSubreddit Component mounted.");
    },
};
</script>

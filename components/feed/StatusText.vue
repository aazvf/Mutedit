<template>
    <div class v-show="articles.length > 0">
        <tailwind-alert
            theme="dark"
            v-if="focusWord === '' && focusSubreddit === '' && 
            !showBlocked && !invertFilter"
        >
            Muting
            <span class="dark:text-red-500 mr-1">
                {{ mutedWords.length }}
                word{{ $s(mutedWords.length) }}
                {{ mutedSubs.length > 1 ? 'and ' + mutedSubs.length + ' subreddit' : '' }}{{ $s(mutedSubs.length) }}
            </span>
            <span v-if="!showBlocked && blockedCount > 0">
                as well as
                <span
                    class="text-red-500"
                >{{ blockedCount }} article{{ $s(blockedCount) }}</span> you've already seen
            </span>
            from feed, which is about
            <span
                class="dark:text-red-500"
            >{{ percentageArticlesHidden }}%</span>
            of all
            <span class="dark:text-red-500">{{ articleCount }} articles</span> loaded so far.
        </tailwind-alert>

        <tailwind-alert
            theme="danger"
            v-if="invertFilter"
        >Showing only the {{ filterCount }} article{{ $s(filterCount) }} that were caught and muted by your filters</tailwind-alert>

        <tailwind-alert
            theme="warning"
            v-if="showBlocked"
        >Showing only the {{ blockedCount }} article{{ $s(blockedCount) }} you've already seen</tailwind-alert>

        <tailwind-alert
            theme="warning"
            v-if="focusWord != ''"
        >Showing only articles containing the word "{{ $ucfirst(focusWord)}}"</tailwind-alert>
        <tailwind-alert
            theme="warning"
            v-if="focusSubreddit != ''"
        >Showing only articles from /r/{{ $ucfirst(focusSubreddit)}}</tailwind-alert>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ...useFeedFilters(),
            articles: useArticles(),
        };
    },
    mounted() {
        console.log("StatusText mounted.");
    },
    computed: {
        percentageArticlesHidden() {
            return this.articleCount > 1
                ? parseInt((this.filterCount / this.articleCount) * 100)
                : 0;
        },
    },
};
</script>

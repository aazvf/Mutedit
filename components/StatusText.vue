<template>
    <div>
        <tailwind-alert
            theme="dark"
            v-if="showword === '' && showsubreddit === '' && showOnly === ''"
        >
            Muting
            <span class="dark:text-red-500 mr-1">
                {{ titleRulesStrings.length }}
                word{{ $s(titleRulesStrings.length) }}
                {{ subredditRulesStrings.length > 1 ? 'and ' + subredditRulesStrings.length + ' subreddit' : '' }}{{ $s(subredditRulesStrings.length) }}
            </span>
            <span
                v-if="!$parent.showBlocked && $parent.blockedCount > 0"
            >as well as {{ $parent.blockedCount }} article{{ $s($parent.blockedCount) }} you've already seen</span>
            from feed, which is about
            <span
                class="dark:text-red-500"
            >{{ percentageArticlesHidden }}%</span>
            of all
            <span class="dark:text-red-500">{{ articleCount }} articles</span> loaded so far.
        </tailwind-alert>

        <tailwind-alert
            theme="warning"
            v-if="showword != ''"
        >Showing only articles containing the word "{{ $ucfirst(showword)}}"</tailwind-alert>
        <tailwind-alert
            theme="warning"
            v-if="showsubreddit != ''"
        >Showing only articles from /r/{{ $ucfirst(showsubreddit)}}</tailwind-alert>
        <tailwind-alert theme="warning" v-if="showOnly != ''">
            Showing only
            <span class="fw-bold">'{{ showOnly }}'</span>
            types of articles
        </tailwind-alert>
    </div>
</template>

<script>
export default {
    data() {
        const { focusArticleType, focusWord, focusSubreddit } =
            useFeedFilters();
        return {
            showword: focusWord,
            showsubreddit: focusSubreddit,
            titleRulesStrings: useFeedTitlePrefs(),
            subredditRulesStrings: useFeedSubredditPrefs(),
            showOnly: focusArticleType,
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
        articleCount() {
            return this.$parent.articles.length;
        },
        filterCount() {
            return this.articleCount - this.$parent.filteredArticles.length;
        },
    },
};
</script>

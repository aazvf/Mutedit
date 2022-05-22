<template>
    <div class v-show="articles.length > 0">
        <tailwind-alert
            theme="bordered"
            v-if="focusWord === '' && focusSubreddit === '' && 
            !showBlocked && !invertFilter"
        >
            Muting
            <span :class="['mr-1', focusColor]">
                {{ mutedWords.length }}
                word{{ $s(mutedWords.length) }}
                {{ mutedSubs.length > 1 ? 'and ' + mutedSubs.length + ' subreddit' : '' }}{{ $s(mutedSubs.length) }}
            </span>
            <span v-if="!showBlocked && blockedCount > 0">
                as well as
                <span
                    :class="[focusColor]"
                >{{ blockedCount }} article{{ $s(blockedCount) }}</span> you've already seen
            </span>
            from feed, which is about
            <span
                :class="[focusColor]"
            >{{ percentageArticlesHidden }}%</span>
            of all
            <span :class="[focusColor]">{{ articleCount }} articles</span> loaded so far.
        </tailwind-alert>

        <tailwind-alert
            theme="active"
            v-if="invertFilter"
        >Showing only the {{ filterCount }} article{{ $s(filterCount) }} that were caught and muted by your filters</tailwind-alert>

        <tailwind-alert
            theme="active"
            v-if="showBlocked"
        >Showing only the {{ blockedCount }} article{{ $s(blockedCount) }} you've already seen</tailwind-alert>

        <tailwind-alert theme="active" v-if="focusWord != ''">
            Showing only articles containing the word "{{ $ucfirst(focusWord)}}"
            <tailwind-badge theme="active" v-on:click="focusWord = ''">(undo?)</tailwind-badge>
        </tailwind-alert>
        <tailwind-alert
            theme="active"
            v-if="focusSubreddit != ''"
        >Showing only articles from /r/{{ $ucfirst(focusSubreddit)}}</tailwind-alert>
    </div>
</template>

<script>
export default {
    data() {
        return {
            theme: useTheme(),
            ...useFeedFilters(),
            articles: useArticles(),
        };
    },
    mounted() {
        console.log("StatusText mounted.");
    },
    computed: {
        focusColor() {
            return this.theme.text3;
        },
        percentageArticlesHidden() {
            return this.articleCount > 1
                ? parseInt((this.filterCount / this.articleCount) * 100)
                : 0;
        },
    },
};
</script>

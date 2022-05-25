<template>
    <tailwind-badge
        theme="inactive"
        class="ml-0 pl-1 pr-1 mt-1"
        v-on:click="expanded = !expanded"
        :class="{truncate: !expanded}"
    >
        {{ articles.length > 1 ? 'showing' : 'loading' }}
        <span
            :class="`${focusColor} mr-1`"
        >{{ activeSortType }}</span>
        <span :class="focusColor" v-if="activeFeedType !== 'all'">{{ activeFeedType }}s</span>
        <span v-if="activeFeedType === 'all'">articles</span>
        <span v-if="['top', 'controversial'].includes(activeSortType)">
            over the past
            <span :class="focusColor">{{ activeTimeperiod }}</span>
        </span>
        <span v-if="activeSubreddits.length > 0">
            from
            <span :class="focusColor">{{ subredditList }}</span>
            {{ activeSubreddits.length > 3 ? `and ${activeSubreddits.length - 3} more` : '' }}
        </span>
        <span v-if="activeSubreddits.length === 0">
            from
            <span :class="focusColor">front page</span>
        </span>
    </tailwind-badge>
</template>

<script>
export default defineComponent({
    name: "Feed sort dynamic description",
    data() {
        return {
            articles: useArticles(),
            expanded: false,
            activeQuery: useFeedQueryParam(),
            activeSortType: useFeedSortParam(),
            activeTimeperiod: useFeedTimeperiodParam(),
            activeFeedType: useFeedTypeParam(),
            theme: useTheme(),
        };
    },

    computed: {
        focusColor() {
            return this.theme.text3;
        },
        subredditList() {
            return this.activeSubreddits.slice(0, 3).join(", ");
        },
        activeSubreddits() {
            return this.activeQuery.length > 1
                ? this.activeQuery.split("+")
                : [];
        },
    },
});
</script>

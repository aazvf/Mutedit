<template>
    <tailwind-alert
        theme="bordered"
        class="ml-0"
        v-on:click="expanded = !expanded"
        :class="{truncate: !expanded}"
    >
        Showing
        <span :class="`${theme.text4} mr-1`">{{ activeSortType }}</span>
        <span :class="theme.text4" v-if="activeFeedType !== 'all'">{{ activeFeedType }}s</span>
        <span v-if="activeFeedType === 'all'">articles</span>
        <span v-if="['top', 'controversial'].includes(activeSortType)">
            over the past
            <span :class="theme.text4">{{ activeTimeperiod }}</span>
        </span>
        <span v-if="activeSubreddits.length > 0">
            from
            <span :class="theme.text4">{{ subredditList }}</span>
            {{ activeSubreddits.length > 3 ? `and ${activeSubreddits.length - 3} more` : '' }}
        </span>
        <span v-if="activeSubreddits.length === 0">
            from
            <span :class="theme.text4">front page</span>
        </span>
    </tailwind-alert>
</template>

<script>
export default defineComponent({
    data() {
        return {
            expanded: false,
            activeQuery: useFeedQueryParam(),
            activeSortType: useFeedSortParam(),
            activeTimeperiod: useFeedTimeperiodParam(),
            activeFeedType: useFeedTypeParam(),
            theme: useTheme(),
        };
    },

    computed: {
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

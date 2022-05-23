<template>
    <div>
        <div class="select-none">
            <tailwind-hr />
            <div :class="uiClasses('sort', 'px-3 my-1')" v-if="uiShow('sort')">
                <div>
                    <pills-feed-sort />
                </div>
                <div v-if="['top', 'controversial'].includes(sort)">
                    <pills-feed-time />
                </div>
            </div>
            <!-- <tailwind-hr /> -->
            <div :class="uiClasses('type', 'px-3 my-1')" v-if="uiShow('type')">
                <pills-feed-type />
            </div>
            <div :class="uiClasses('description')" v-if="uiShow('description')">
                <feed-description />
            </div>
            <pills-subreddits :class="uiClasses('subs')" v-if="uiShow('subs')" />
            <!-- <tailwind-hr /> -->
            <pills-words :class="uiClasses('words')" v-if="uiShow('words')" />
            <feed-status-text :class="uiClasses('status')" v-if="uiShow('status')" />
        </div>
        <!-- <tailwind-hr class="mb-4 mt-1" /> -->
        <floating-muter />
        <div :class="feedColumns">
            <feed-filtered-articles />
        </div>
        <feed-article-fetcher />
    </div>
</template>

<script>
export default defineComponent({
    name: "Mutedit Layout",
    data() {
        return {
            settingsOpen: useSettingsOpen(),
            sort: useFeedSortParam(),
            theme: useTheme(),
        };
    },
    computed: {
        feedColumns() {
            // return "grid grid-cols-3";
            const c = this.$theme().columns;
            return `grid lg:grid-cols-${+c + 1}`;
            return `columns-1 lg:columns-${+c + 1}`;
        },
    },
    methods: {
        uiClasses(component, classes = "") {
            return [
                classes,
                this.settingsOpen && !this.theme.show.includes(component)
                    ? "py-5 " + this.theme.bg3
                    : "",
            ];
        },
        uiShow(component) {
            return this.settingsOpen || this.theme.show.includes(component);
        },
    },
});
</script>

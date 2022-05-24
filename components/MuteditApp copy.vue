<template>
    <div>
        <div class="select-none">
            <tailwind-card :class="uiClasses('description', 'pb-3')" v-if="uiShow('description')">
                <theme-hidden-badge
                    v-if="!themeShow('description')"
                    v-on:click="theme.toggleUi('description')"
                />
                <feed-description class />
            </tailwind-card>
            <tailwind-card :class="uiClasses('sort', 'px-3 my-1 pb-2')" v-if="uiShow('sort')">
                <theme-hidden-badge v-if="!themeShow('sort')" v-on:click="theme.toggleUi('sort')" />
                <div>
                    <pills-feed-sort />
                </div>
                <div class="mt-1" v-if="['top', 'controversial'].includes(sort)">
                    <pills-feed-time />
                </div>
            </tailwind-card>
            <tailwind-card :class="uiClasses('type', 'px-3 my-1 pb-2')" v-if="uiShow('type')">
                <theme-hidden-badge v-if="!themeShow('type')" v-on:click="theme.toggleUi('type')" />
                <pills-feed-type />
            </tailwind-card>

            <tailwind-card :class="uiClasses('status', 'pb-3')" v-if="uiShow('status')">
                <theme-hidden-badge
                    v-if="!themeShow('status')"
                    v-on:click="theme.toggleUi('status')"
                />
                <feed-status-text />
            </tailwind-card>
            <tailwind-card :class="uiClasses('subs')" v-if="uiShow('subs')">
                <theme-hidden-badge v-if="!themeShow('subs')" v-on:click="theme.toggleUi('subs')" />
                <pills-subreddits />
            </tailwind-card>
            <tailwind-card :class="uiClasses('words')" v-if="uiShow('words')">
                <theme-hidden-badge
                    v-if="!themeShow('words')"
                    v-on:click="theme.toggleUi('words')"
                />
                <pills-words />
            </tailwind-card>
        </div>
        <floating-muter />
        <tailwind-hr />
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
            const c = this.$theme().columns;
            return c > 1 ? `grid grid-cols-1 lg:grid-cols-${+c + 1}` : "";
        },
    },
    methods: {
        uiClasses(component, classes = "") {
            return classes;
            // return [classes, this.settingsOpen ? "py-4" : ""];
            // return [
            //     classes,
            //     this.settingsOpen && !this.themeShow(component)
            //         ? "py-4 " + this.theme.bg(200, true)
            //         : "",
            // ];
        },
        uiShow(component) {
            return this.settingsOpen || this.themeShow(component);
        },
        themeShow(component) {
            return this.theme.show.includes(component);
        },
    },
});
</script>

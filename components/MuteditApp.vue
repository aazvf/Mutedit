<template>
    <div>
        <div class="select-none">
            <tailwind-card class v-if="uiShow(['sort', 'type', 'description'])">
                <div class="px-2 py-2 relative">
                    <div :class="uiClasses('sort', 'relative')" v-if="uiShow('sort')">
                        <theme-hidden-badge
                            v-if="settingsOpen"
                            :hidden="!themeShow('sort')"
                            v-on:click="toggleUi('sort')"
                        />
                        <pills-feed-sort />
                        <div class="mt-2" v-if="['top', 'controversial'].includes(sort)">
                            <pills-feed-time />
                        </div>
                    </div>

                    <div :class="uiClasses('type', 'relative mt-2')" v-if="uiShow('type')">
                        <pills-feed-type />
                        <theme-hidden-badge
                            v-if="settingsOpen"
                            :hidden="!themeShow('type')"
                            v-on:click="toggleUi('type')"
                        />
                    </div>
                    <div :class="uiClasses('description', 'relative')" v-if="uiShow('description')">
                        <feed-description class="text-lg" />
                        <theme-hidden-badge
                            v-if="settingsOpen"
                            :hidden="!themeShow('description')"
                            v-on:click="toggleUi('description')"
                        />
                    </div>
                </div>
            </tailwind-card>

            <tailwind-card v-if="uiShow(['subs', 'words', 'status'])">
                <div :class="uiClasses('subs', 'relative')" v-if="uiShow('subs')">
                    <theme-hidden-badge
                        v-if="settingsOpen"
                        :hidden="!themeShow('subs')"
                        v-on:click="toggleUi('subs')"
                    />
                    <pills-subreddits />
                </div>
                <div :class="uiClasses('words', 'relative')" v-if="uiShow('words')">
                    <theme-hidden-badge
                        v-if="settingsOpen"
                        :hidden="!themeShow('words')"
                        v-on:click="toggleUi('words')"
                    />
                    <pills-words />
                </div>
                <div :class="uiClasses('status', 'pb-3 relative')" v-if="uiShow('status')">
                    <theme-hidden-badge
                        v-if="settingsOpen"
                        :hidden="!themeShow('status')"
                        v-on:click="toggleUi('status')"
                    />
                    <feed-status-text />
                </div>
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
        toggleUi(component) {
            this.theme.toggleUi(component);
            this.$localstorage.saveUserTheme();
        },
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
            return typeof component === "object"
                ? component.some((c) => this.theme.show.includes(c))
                : this.theme.show.includes(component);
            // return this.theme.show.includes(component);
        },
    },
});
</script>

<template>
    <div>
        <div class="select-none">
            <theme-toggled-slot uid="sort,type,description" :button="false">
                <tailwind-card class="pb-2 pt-3 md:px-5">
                    <theme-toggled-slot uid="sort">
                        <pills-feed-sort />
                        <div class="mt-2" v-if="['top', 'controversial'].includes(sort)">
                            <pills-feed-time />
                        </div>
                    </theme-toggled-slot>

                    <theme-toggled-slot class="mt-2" uid="type">
                        <pills-feed-type />
                    </theme-toggled-slot>

                    <theme-toggled-slot uid="description">
                        <feed-description class="text-lg" />
                    </theme-toggled-slot>
                </tailwind-card>
            </theme-toggled-slot>

            <theme-toggled-slot uid="subs,words,status" :button="false">
                <tailwind-card class="pb-4">
                    <theme-toggled-slot uid="subs">
                        <pills-subreddits />
                    </theme-toggled-slot>
                    <theme-toggled-slot uid="words">
                        <pills-words />
                    </theme-toggled-slot>
                    <theme-toggled-slot uid="status">
                        <feed-status-text />
                    </theme-toggled-slot>
                </tailwind-card>
            </theme-toggled-slot>
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
});
</script>

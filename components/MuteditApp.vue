<template>
    <div>
        <div class="select-none">
            <theme-toggled-slot uid="sort,type,description" :button="false">
                <tailwind-card class="py-1 md:px-5">
                    <theme-toggled-slot uid="sort">
                        <feed-pills-sort />
                        <div class="my-1" v-if="['top', 'controversial'].includes(sort)">
                            <feed-pills-time />
                        </div>
                    </theme-toggled-slot>

                    <theme-toggled-slot class="my-1" uid="type">
                        <feed-pills-type />
                    </theme-toggled-slot>

                    <theme-toggled-slot uid="description">
                        <feed-description />
                    </theme-toggled-slot>
                </tailwind-card>
            </theme-toggled-slot>

            <theme-toggled-slot uid="subs,words,status" :button="false">
                <tailwind-card class="pb-4">
                    <theme-toggled-slot uid="subs">
                        <feed-pills-muted-subs />
                    </theme-toggled-slot>
                    <theme-toggled-slot uid="words">
                        <feed-pills-muted-words />
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
        <feed-load-more />
    </div>
</template>

<script>
export default defineComponent({
    name: "Mutedit app layout",
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

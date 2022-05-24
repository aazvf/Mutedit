<template>
    <div class="select-none">
        <theme-cards-open-settings />
        <div v-if="settingsOpen">
            <theme-cards-dark-mode />

            <div class="md:columns-2 mt-4 gap-0">
                <theme-cards-primary />

                <theme-cards-accent />
            </div>

            <theme-cards-switches />
            <theme-cards-style />
        </div>
    </div>
</template>

<script>
export default defineComponent({
    data() {
        return {
            theme: useTheme(),

            settingsOpen: useSettingsOpen(),
        };
    },
});
</script>

<style scoped>
.leading-squared {
    line-height: 4.3rem;
}
</style>
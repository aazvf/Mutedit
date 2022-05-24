<template>
    <tailwind-card>
        <span :class="['px-1 mr-1', theme.text3]">theme:</span>
        <theme-color :color="theme.color" :accent="theme.accent" :border="theme.accent" />
        <theme-color
            v-for="([color, accent], index) in randThemes"
            :key="index"
            :color="color"
            :accent="accent"
            v-on:click="onThemeClick(color, accent)"
        />

        <tailwind-badge
            class="ml-2"
            v-on:click="settingsOpen = !settingsOpen"
            :theme="settingsOpen ? 'active' : 'bordered'"
        >{{ settingsOpen ? 'less' : 'more' }} settings</tailwind-badge>
    </tailwind-card>
</template>

<script>
export default defineComponent({
    data() {
        return {
            theme: useTheme(),
            randThemes: [],
            settingsOpen: useSettingsOpen(),
        };
    },
    mounted() {
        this.makeRandomThemes();
    },
    methods: {
        onThemeClick(color, accent) {
            if (this.spinblur) {
                return;
            }
            this.theme.color = color;
            this.theme.accent = accent;
            this.$localstorage.saveUserTheme();
            this.makeRandomThemes();
        },
        rand(items) {
            return items[(items.length * Math.random()) | 0];
        },
        makeRandomThemes() {
            setTimeout(() => (this.spinblur = false), 400);
            this.randThemes = [];
            while (this.randThemes.length < 3) {
                this.randThemes.push(
                    this.theme.randTheme(this.randThemes.flat())
                );
            }
        },
    },
});
</script>

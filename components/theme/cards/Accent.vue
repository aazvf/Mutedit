<template>
    <tailwind-card class="color-squares break-inside-avoid">
        <span :class="['px-1 mr-1 mt-0', theme.text3]">accent:</span>
        <theme-color
            v-for="(color, index) in theme.colors"
            :key="index"
            :color="theme.color"
            :accent="color"
            v-on:click="onAccentClick(color)"
        />
    </tailwind-card>
</template>


<script>
export default defineComponent({
    name: "Theme accent colors",
    data() {
        return {
            theme: useTheme(),
        };
    },
    methods: {
        onAccentClick(accent) {
            this.theme.accent = accent;
            this.$localstorage.saveUserTheme();
        },
    },
});
</script>

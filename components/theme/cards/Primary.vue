<template>
    <tailwind-card class="color-squares mt-0">
        <span :class="['px-1 mr-1', $theme.text3]">primary:</span>
        <theme-color
            v-for="(color, index) in $theme.colors"
            :key="index"
            :color="color"
            v-on:click="onColorClick(color)"
        />
    </tailwind-card>
</template>


<script>
export default defineComponent({
    name: "Theme primary color",
    methods: {
        onColorClick(color) {
            if (this.$theme.accent === this.$theme.color) {
                this.$theme.accent = color;
            }
            this.$theme.color = color;
            this.$localstorage.saveUserTheme();
        },
    },
});
</script>

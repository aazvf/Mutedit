<template>
    <tailwind-toggle class="align-middle" :value="theme.dark" v-on:toggle="toggleDark">dark mode</tailwind-toggle>
</template>


<script>
export default defineComponent({
    data() {
        return {
            theme: useTheme(),
        };
    },
    methods: {
        toggleDark() {
            this.theme.toggleDark();
            this.$localstorage.saveUserTheme();
        },
    },
});
</script>

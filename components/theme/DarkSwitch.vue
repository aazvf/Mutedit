<template>
    <tailwind-toggle :value="theme.dark" v-on:toggle="toggleDark">Dark Mode</tailwind-toggle>
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

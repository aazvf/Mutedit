<template>
    <tailwind-card class="my-2 pt-3 pb-3 mb-0">
        <tailwind-toggle class="align-middle" :value="theme.dark" v-on:toggle="toggleDark">dark mode</tailwind-toggle>
    </tailwind-card>
</template>


<script>
export default defineComponent({
    name: "Dark mode switch",
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

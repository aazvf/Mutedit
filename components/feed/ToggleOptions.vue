<template>
    <div>
        <tailwind-toggle :value="darkMode" v-on:toggle="toggleDarkMode">Dark Mode</tailwind-toggle>

        <tailwind-toggle
            v-if="filterCount > 0"
            :value="invertFilter"
            v-on:toggle="invertFilter = !invertFilter; showBlocked = false"
        >show the {{ filterCount }} article{{ filterCount > 1 ? 's' : '' }} muted by your filters</tailwind-toggle>
        <tailwind-toggle
            v-if="blockedCount > 0"
            :value="showBlocked"
            v-on:toggle="showBlocked = !showBlocked; invertFilter = false"
        >show the {{ blockedCount }} article{{ $s(blockedCount) }} you've already seen</tailwind-toggle>
    </div>
</template>

<script>
export default defineComponent({
    data() {
        return { ...useFeedFilters(), darkMode: true };
    },
    methods: {
        toggleDarkMode() {
            document.documentElement.classList.toggle("dark");
            this.darkMode = !this.darkMode;
        },
    },
});
</script>

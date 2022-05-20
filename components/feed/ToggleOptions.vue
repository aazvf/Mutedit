<template>
    <div>
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
        return { ...useFeedFilters() };
        const { invertFilter, filterCount, blockedCount, showBlocked } =
            useFeedFilters();

        return {
            blockedCount,
            showBlocked,
            invertFilter,
            filterCount,
        };
    },
});
</script>

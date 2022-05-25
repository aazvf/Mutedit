<template>
    <NuxtLink
        v-for="(sort, index) in sortTypes"
        :href="$buildUrl({sort})"
        :key="index"
        :class="{'pointer-events-none': waiting}"
    >
        <tailwind-badge :theme="badgeTheme(sort)">{{ $ucfirst(sort) }}</tailwind-badge>
    </NuxtLink>
</template>


<script>
import sortTypes from "~/assets/data/sortTypes";
export default defineComponent({
    name: "Sort feed nav buttons",
    data() {
        return {
            ...{ sortTypes },
            activeSort: useFeedSortParam(),
            waiting: useWaitingForArticles(),
        };
    },
    methods: {
        badgeTheme(sort) {
            return this.activeSort === sort
                ? "active"
                : this.waiting
                ? "disabled"
                : "inactive";
        },
    },
});
</script>

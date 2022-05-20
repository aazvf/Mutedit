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
                ? "green"
                : this.waiting
                ? "darker"
                : "default";
        },
    },
});
</script>

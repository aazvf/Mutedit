<template>
    <NuxtLink v-for="(sort, index) in sortTypes" :href="$buildUrl({sort})" :key="index">
        <tailwind-badge :theme="sort === activeSort ? 'green' : 'default'">{{ $ucfirst(sort) }}</tailwind-badge>
    </NuxtLink>
</template>


<script>
import sortTypes from "~/assets/data/sortTypes";
export default defineComponent({
    data() {
        return {
            ...{ sortTypes },
            activeSort: useFeedSortParam(),
        };
    },
});
</script>

<template>
    <NuxtLink
        v-for="(type, index) in articleTypes"
        :key="index"
        :href="$buildUrl({type})"
        :class="{'pointer-events-none': waiting}"
    >
        <tailwind-badge :theme="badgeTheme(type)">{{ $ucfirst(type) }}</tailwind-badge>
    </NuxtLink>
</template>

<script>
import articleTypes from "~/assets/data/articleTypes";

export default {
    data() {
        return {
            activeFeedType: useFeedTypeParam(),
            ...{ articleTypes },
            waiting: useWaitingForArticles(),
        };
    },
    mounted() {
        console.log("PillsArticleTypes mounted.");
    },
    methods: {
        setType(type) {
            this.activeFeedType = type;
        },
        badgeTheme(type) {
            return this.activeFeedType === type
                ? "active"
                : this.waiting
                ? "disabled"
                : "inactive";
        },
    },
};
</script>

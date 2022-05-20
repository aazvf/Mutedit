<template>
    <NuxtLink v-for="(type, index) in articleTypes" :key="index" :href="$buildUrl({type})">
        <tailwind-badge :theme="activeFeedType === type ? 'green' : 'default'">{{ $ucfirst(type) }}</tailwind-badge>
    </NuxtLink>
</template>

<script>
import articleTypes from "~/assets/data/articleTypes";

export default {
    data() {
        return {
            activeFeedType: useFeedTypeParam(),
            ...{ articleTypes },
        };
    },
    mounted() {
        console.log("PillsArticleTypes mounted.");
    },
    methods: {
        setType(type) {
            this.activeFeedType = type;
        },
    },
};
</script>

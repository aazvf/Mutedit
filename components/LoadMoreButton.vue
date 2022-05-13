<template>
    <div class="text-center m-6 p-6">
        <tailwind-spinner theme="purple" v-if="$parent.loadingArticles" />
        <tailwind-button
            theme="purple"
            class="font-bold"
            v-if="!$parent.loadingArticles"
            v-on:click="$parent.getAnotherPage()"
        >Load More</tailwind-button>
    </div>
</template>

<script>
export default {
    methods: {},
};
</script>

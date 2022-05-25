<template>
    <span>
        <tailwind-badge :theme="theme">score: {{ $abbreviateNumber(article.data.score) }}</tailwind-badge>
        <tailwind-badge :theme="theme">comments: {{ $abbreviateNumber(article.data.num_comments) }}</tailwind-badge>
        <tailwind-badge
            v-if="article.data.num_crossposts > 0"
            :theme="theme"
        >xposts: {{ $abbreviateNumber(article.data.num_crossposts) }}</tailwind-badge>
        <tailwind-badge v-if="article.data.archived" :theme="theme">archived</tailwind-badge>
        <tailwind-badge v-if="article.data.locked" :theme="theme">locked</tailwind-badge>
        <tailwind-badge v-if="article.data.quarantine" :theme="theme">quarantined</tailwind-badge>
        <tailwind-badge v-if="article.data.spoiler" :theme="theme">spoilers</tailwind-badge>
        <tailwind-badge v-if="article.data.stickied" :theme="theme">stickied</tailwind-badge>
        <tailwind-badge v-if="article.data.pinned" :theme="theme">pinned</tailwind-badge>
        <tailwind-badge :theme="theme" v-if="article.data.over_18">NSFW</tailwind-badge>
        <tailwind-badge
            v-if="article.data.removal_reason"
            :theme="theme"
        >removal_reason: {{ article.data.removal_reason }}</tailwind-badge>
    </span>
</template>


<script>
export default defineComponent({
    name: "Article meta badges",
    props: { article: { type: Object, required: true } },
    setup() {
        return {
            theme: "static",
        };
    },
});
</script>

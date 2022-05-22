<template>
    <span>
        <tailwind-badge theme="static">score: {{ $abbreviateNumber(article.data.score) }}</tailwind-badge>
        <tailwind-badge theme="static">comments: {{ $abbreviateNumber(article.data.num_comments) }}</tailwind-badge>

        <tailwind-badge
            v-if="article.data.num_crossposts > 0"
            theme="static"
        >crossposts: {{ $abbreviateNumber(article.data.num_crossposts) }}</tailwind-badge>

        <tailwind-badge v-if="article.data.archived" theme="static">archived</tailwind-badge>

        <tailwind-badge v-if="article.data.locked" theme="static">locked</tailwind-badge>

        <tailwind-badge v-if="article.data.quarantine" theme="static">quarantined</tailwind-badge>
        <tailwind-badge v-if="article.data.spoiler" theme="static">spoilers</tailwind-badge>
        <tailwind-badge v-if="article.data.stickied" theme="static">stickied</tailwind-badge>
        <tailwind-badge v-if="article.data.pinned" theme="static">pinned</tailwind-badge>
        <tailwind-badge theme="static" v-if="article.data.over_18">NSFW</tailwind-badge>

        <tailwind-badge
            v-if="article.data.removal_reason"
            theme="static"
        >removal_reason: {{ article.data.removal_reason }}</tailwind-badge>
    </span>
</template>


<script>
export default defineComponent({
    props: { article: { type: Object, required: true } },
    setup() {},
});
</script>

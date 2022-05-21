<template>
    <div>
        <tailwind-spinner theme="pink" v-if="article.loadingComments" />

        <article-comments-list :comments="article.comments" v-if="article.comments.length > 0" />
    </div>
</template>

<script>
export default {
    name: "Article Comments",
    props: { article: { type: Object, required: true } },
};
</script>

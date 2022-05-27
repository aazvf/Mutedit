<template>
    <div>
        <tailwind-spinner class="m-5" v-if="article.loadingComments" />

        <article-comments-list
            :comments="article.comments"
            v-if="article.comments.length > 0"
            :class="themeClassList"
        />
    </div>
</template>

<script>
export default {
    name: "Article comments",
    props: { article: { type: Object, required: true } },

    computed: {
        themeClassList() {
            const { bg1, text2 } = this.$theme;
            return ["mb-5", bg1, text2].join(" ");
        },
    },
};
</script>

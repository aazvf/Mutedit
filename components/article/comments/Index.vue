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
    name: "Article Comments",
    props: { article: { type: Object, required: true } },
    data() {
        return {
            theme: useTheme(),
        };
    },
    computed: {
        themeClassList() {
            const { bg1, text1 } = this.theme;
            return ["", bg1, text1].join(" ");
        },
    },
};
</script>

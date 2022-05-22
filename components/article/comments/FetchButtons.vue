<template>
    <div class="inline-block">
        <tailwind-badge
            :disabled="article.loadingComments || lastSort === 'top'"
            :theme="lastSort === 'top' ? 'active' : 'bordered'"
            v-on:click="getComments('top')"
        >Top</tailwind-badge>
        <tailwind-badge
            :theme="lastSort === 'controversial' ? 'active' : 'bordered'"
            v-on:click="getComments('controversial')"
        >Controversial</tailwind-badge>

        <tailwind-badge
            v-if="article.comments.length > 0"
            theme="focused"
            v-on:click="clearComments"
        >close comments</tailwind-badge>
    </div>
</template>

<script>
export default defineComponent({
    name: "Comment Fetcher Buttons",
    props: {
        article: { type: Object, required: true },
    },
    data() {
        return {
            lastSort: "",
        };
    },
    methods: {
        clearComments() {
            this.article.comments = [];
            this.lastSort = "";
        },

        // Fetch the comments for this article and push them to the article.comments array
        getComments(sort) {
            if (this.lastSort === sort) {
                return;
            }
            this.lastSort = sort;
            this.$fetchComments(this.article, sort);
        },
    },
});
</script>

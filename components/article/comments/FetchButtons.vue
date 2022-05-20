<template>
    <div class="inline-block">
        <tailwind-badge
            :disabled="article.loadingComments || lastSort === 'top'"
            :theme="lastSort === 'top' ? 'dark' : 'green'"
            v-on:click="getComments('top')"
        >Top</tailwind-badge>
        <tailwind-badge
            :theme="lastSort === 'controversial' ? 'dark' : 'green'"
            v-on:click="getComments('controversial')"
        >Controversial</tailwind-badge>

        <tailwind-badge
            v-if="article.comments.length > 0"
            theme="yellow"
            v-on:click="clearComments"
        >close comments</tailwind-badge>
    </div>
</template>



<script>
export default defineComponent({
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
        // Recursively maps the reddit comment object into a flatter object easier to iterate over.
        mapComment(c) {
            const meta = ` == - ${c.data.author} (${c.data.score}) ==`;
            return {
                text: c.data.body + meta,
                expanded: false,
                children:
                    c.data.replies?.data?.children
                        ?.filter((c) => typeof c.data.body === "string")
                        .map(this.mapComment) || [],
            };
        },

        // Fetch the comments for this article and push them to the article.comments array
        getComments(sort) {
            if (this.lastSort === sort) {
                return;
            }
            this.lastSort = sort;
            this.article.loadingComments = true;
            const url =
                "https://www.reddit.com" +
                this.article.data.permalink +
                ".json?sort=" +
                sort;
            fetch(url)
                .then((response) => response.json())
                .then((response) => {
                    const comments = response[1].data.children
                        .filter((c) => {
                            return (
                                c.data.depth === 0 &&
                                c.data.distinguished === null &&
                                typeof c.data.body === "string" &&
                                c.data.body.length > 1
                            );
                        })
                        .map(this.mapComment);
                    this.article.comments = comments;
                    this.article.loadingComments = false;
                });
        },
    },
});
</script>

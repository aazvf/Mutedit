<template>
    <div class="inline-block">
        <tailwind-button
            :disabled="article.loadingComments || lastSort === 'top'"
            :theme="lastSort === 'top' ? 'light' : 'alternative'"
            v-on:click="getComments('top')"
        >Top</tailwind-button>

        <tailwind-button
            :theme="lastSort === 'controversial' ? 'light' : 'alternative'"
            v-on:click="getComments('controversial')"
        >Controversial</tailwind-button>

        <tailwind-button
            v-if="article.comments.length > 0"
            theme="yellow"
            v-on:click="article.comments = []"
        >close comments</tailwind-button>
    </div>
</template>



<script>
import axios from "axios";

export default defineComponent({
    props: {
        article: { type: Object, required: true },
    },
    data() {
        return {
            maxComments: 9,
            maxCommentLength: 300,
            lastSort: "",
        };
    },
    methods: {
        mapComment(c) {
            const comment = {
                text: c.data.body,
                expanded: false,
                children:
                    typeof c.data.replies === "object" &&
                    this.$isArray(c.data.replies.data.children)
                        ? c.data.replies.data.children
                              .filter((c) => typeof c.data.body === "string")
                              .map(this.mapComment)
                        : [],
            };

            return comment;
        },

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
            axios.get(url).then((response) => {
                const comments = response.data[1].data.children
                    .filter((c) => {
                        return (
                            c.data.depth === 0 &&
                            c.data.distinguished === null &&
                            typeof c.data.body === "string" &&
                            c.data.body.length > 1
                        );
                    })
                    .slice(0, this.maxComments)
                    .map(this.mapComment);
                this.article.comments = comments;
                this.article.loadingComments = false;
            });
        },
    },
});
</script>

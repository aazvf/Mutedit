<template>
    <ul v-if="comments.length > 0" :class="classList" :attrs="$attrs">
        <li
            v-for="(comment, index) in filteredComments"
            :key="index"
            v-on:click="comment.expanded = true"
            :class="listClassNames(index)"
        >
            <tailwind-badge
                v-if="comment.more"
                theme="inactive"
                v-on:click="loadMoreReplies(comment)"
            >{{ comment.text }}</tailwind-badge>
            <div
                :class="commentClassNames(comment)"
                v-html="commentHtml(comment)"
                v-if="!comment.more"
            />
            <tailwind-badge
                theme="bordered"
                v-if="comment.children.length > 0 && !comment.expanded"
                class="absolute right-0 bottom-1.5"
            >({{ comment.children.length }} repl{{ comment.children.length > 1 ? 'ies' : 'y' }})</tailwind-badge>
            <article-comments-list
                v-if="comment.expanded && filteredChildren(comment).length > 0"
                :comments="comment.children"
            ></article-comments-list>
        </li>
        <li v-if="hasMoreComments" :class="listClassNames(-1)">
            <tailwind-badge
                class="my-1"
                theme="active"
                v-on:click="showMoreComments"
            >show {{ hiddenCommentcount }} remaining comment{{ $s(hiddenCommentcount) }}</tailwind-badge>
        </li>
    </ul>
</template>


<script>
export default defineComponent({
    name: "Comment list",
    props: {
        comments: { type: Array, default: [] },
    },
    data() {
        return {
            commmentLimit: 7,
        };
    },
    mounted() {},
    computed: {
        classList() {
            return [
                this.$theme.border5,
                "w-100 text-sm font-medium border rounded-lg shadow-lg",
            ].join(" ");
        },

        filteredComments() {
            return this.comments
                .filter((c) => !c.more || !c.more.loaded)
                .slice(0, this.commmentLimit);
        },
        hiddenCommentcount() {
            return Math.max(0, this.comments.length - this.commmentLimit);
        },
        hasMoreComments() {
            return this.hiddenCommentcount > 0;
        },
    },
    methods: {
        filteredChildren(comment) {
            return comment.children
                .filter((c) => !c.more || !c.more.loaded)
                .slice(0, this.commmentLimit);
        },
        loadMoreReplies(comment) {
            this.$fetchCommentReplies(comment, this.comments);
        },
        commentHtml(comment) {
            return this.$markdown(comment.text);
        },
        commentClassNames(comment) {
            return {
                "break-words text-clip whitespace-pre-wrap text-ellipsis py-1 px-1 normal-case": true,
            };
        },
        showMoreComments() {
            this.commmentLimit = parseInt(this.commmentLimit * 2.5);
        },
        listClassNames(index) {
            const classes = {
                "relative w-full px-1 py-1 border-b": true,
                "rounded-t-lg": index === 0,
                "rounded-b-lg": index === -1,
                "rounded-b-lg":
                    index === this.filteredComments.length - 1 &&
                    !this.hasMoreComments,
            };
            classes[this.$theme.border5] = true;
            return classes;
        },
    },
});
</script>



<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
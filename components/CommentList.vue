<template>
    <ul
        class="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        v-if="comments.length > 0"
    >
        <li
            v-for="(comment, index) in comments"
            :key="index"
            v-on:click="comment.expanded = true"
            :class="listClassNames(index)"
        >
            <div class="break-word text-clip whitespace-pre-wrap" v-html="$markdown(comment.text)"></div>
            <span
                v-if="comment.children.length > 0"
                class="text-purple dark:text-violet-300"
            >({{ comment.children.length }} replies)</span>
            <comment-list :comments="comment.children" v-if="comment.expanded"></comment-list>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        comments: { type: Array },
    },
    mounted() {},
    computed: {
        isLoading() {
            return (
                typeof this.comments[0] === "object" &&
                this.comments[0].text === "loading"
            );
        },
    },
    methods: {
        listClassNames(index) {
            return {
                "w-full px-2 py-1 border-b border-gray-200 dark:border-gray-600": true,
                "rounded-t-lg": index === 0,
                "rounded-b-lg": index === this.comments.length - 1,
            };
        },
    },
};
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
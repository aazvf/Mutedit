<template>
    <div
        :class="{'overflow-hidden break-words dark:text-gray-300 mb-4': true, 'max-h-44': article.showPreview}"
        v-html="postHtml"
        v-on:click="article.showPreview = false"
    ></div>
</template>


<script>
export default defineComponent({
    props: {
        article: { type: Object, required: true },
    },
    computed: {
        postHtml() {
            const txt = document.createElement("textarea");
            txt.innerHTML = this.article.data.selftext_html;
            return txt.value;
        },
    },
});
</script>

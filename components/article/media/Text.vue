<template>
    <div
        :class="{'overflow-hidden break-words dark:text-gray-300 mb-4 px-1': true, 'max-h-44': showPreview}"
        v-html="$htmlDecode(article.data.selftext_html)"
        v-on:click="showPreview = false"
    />
</template>


<script>
export default defineComponent({
    props: {
        article: { type: Object, required: true },
    },
    data() {
        return {
            showPreview: true,
        };
    },
    computed: {
        postHtml() {
            // return this.$markdown(this.article.data.selftext);
            const txt = document.createElement("textarea");
            txt.innerHTML = this.article.data.selftext_html;
            return txt.value;
        },
    },
});
</script>

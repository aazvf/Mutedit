<template>
    <div
        v-if="article.data.selftext_html"
        :class="classList"
        v-html="$htmlDecode(article.data.selftext_html)"
        v-on:click="showPreview = false"
    />
</template>


<script>
export default defineComponent({
    name: "Article selftext",
    props: {
        article: { type: Object, required: true },
    },
    data() {
        return {
            showPreview: true,
        };
    },
    computed: {
        classList() {
            return [
                "overflow-hidden break-words mb-4 px-1",
                "normal-case border-t pt-4 dark:text-gray-300 selftext",
                this.showPreview ? "max-h-44" : "",
                this.$theme.border5,
                this.$theme.text2,
            ];
        },
        postHtml() {
            // return this.$markdown(this.article.data.selftext);
            const txt = document.createElement("textarea");
            txt.innerHTML = this.article.data.selftext_html;
            return txt.value;
        },
    },
});
</script>

<style>
.selftext p {
    margin-bottom: 0.5em;
}
</style>

<template>
    <div class="display-block py-2">
        <tailwind-button
            target="_blank"
            rel="noopener noreferer"
            :href="article.data.url"
            theme="green"
        >{{ urlHumanView }}</tailwind-button>
    </div>
</template>



<script>
export default defineComponent({
    props: {
        article: { type: Object, required: true },
    },
    data() {
        return {
            urlHumanView: this.article.data.url.slice(8).slice(0, 30) + "...",
        };
    },
});
</script>
<template>
    <div class="display-block py-2">
        <NuxtLink target="_blank" rel="noopener noreferer" :href="article.data.url">
            <tailwind-badge class="block pt-2 pb-2 px-5 text-lg" theme="active">> {{ urlHumanView }}</tailwind-badge>
        </NuxtLink>
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
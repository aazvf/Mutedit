<template>
    <div class="p-4 relative z-0 align-center mb-5">
        <article-media-preview-underlay v-if="article.seen" :src="article.previewSource" />
        <tailwind-spinner v-if="!article.seen"></tailwind-spinner>
        <img
            v-if="article.seen && article.hasPreview"
            :src="article.previewSource"
            alt="preview"
            referrerpolicy="no-referrer"
        />

        <article-media-preview-play-icon v-if="article.isPlayable" />
    </div>
</template>


<script>
export default defineComponent({
    name: "Lazy load preview",
    props: {
        article: { type: Object, required: true },
    },
});
</script>


<style scoped>
img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 45vh;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    z-index: 1;
}
</style>
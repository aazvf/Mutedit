<template>
    <div class="p-4 relative z-0 align-center mb-5">
        <article-media-preview-underlay :src="article.previewSource" />

        <img :src="article.previewSource" alt="preview" referrerpolicy="no-referrer" />

        <article-media-preview-play-icon v-if="article.isPlayable" />
    </div>
</template>


<script>
export default defineComponent({
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
}
</style>
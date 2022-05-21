<template>
    <div>
        <article-media-image :src="article.gallerySource" v-on:click="article.galleryIndex++" />

        <div
            class="p-4 text-center text-purple-300"
            v-if="article.isGallery"
        >{{article.galleryIndex % article.galleryCount + 1}} of {{ article.galleryCount }}</div>
    </div>
</template>

<script>
export default defineComponent({
    props: {
        article: { type: Object, required: true },
    },
});
</script>

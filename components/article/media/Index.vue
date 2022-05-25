<template>
    <div class="mb-5">
        <Transition>
            <article-media-preview
                :article="article"
                v-show="article.hasPreview && showPreview"
                v-on:click="onClickPreview"
            />
        </Transition>

        <article-media-text :article="article" v-if="article.isText" />
        <article-media-link :article="article" v-if="article.isLink" />

        <Transition>
            <div
                class="relative z-0"
                v-if="!article.isText && !article.isLink && !showPreview || !article.hasPreview"
            >
                <article-media-preview-underlay
                    :src="isGallery ? article.gallerySource : article.previewSource"
                />

                <article-media-image
                    v-if="article.isImage || article.isGif"
                    :src="article.data.url"
                    v-on:click="showPreview = true"
                />
                <article-media-gallery v-if="article.isGallery" :article="article" />

                <article-media-video-youtube v-if="article.youtubeId" :src="article.youtubeId" />
                <article-media-video-streamable
                    v-if="article.streamableId"
                    :src="article.streamableId"
                />
                <article-media-video-gfycat v-if="article.gfycatId" :src="article.gfycatId" />
                <article-media-video-reddit :article="article" v-if="article.isVideo" />
                <article-media-video-redgif :article="article" v-if="article.redgifId" />
                <article-media-video-gifv :article="article" v-if="article.isGifv" />
                <div class="inline-block float-right mt-0" v-if="article.isPlayable">
                    <tailwind-badge theme="focused" v-on:click="showPreview = true">Close</tailwind-badge>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
export default defineComponent({
    name: "Article media presenter",
    props: {
        article: { type: Object, required: true },
    },

    data() {
        const { isGallery, isText } = this.article;

        return {
            showPreview: true,
            ...{ isGallery, isText },
        };
    },

    methods: {
        onClickPreview() {
            this.showPreview = !(
                this.article.isPlayable || this.article.isImage
            );
        },
    },
});
</script>

<style scoped>
.v-enter-active {
    transition: opacity 0.5s ease;
}

.v-enter-from {
    opacity: 0;
}
</style>
<template>
    <div class="mb-3" v-if="!isText">
        <Transition>
            <article-media-preview v-show="hasPreview && showPreview" v-on:click="onClickPreview" />
        </Transition>

        <Transition>
            <div class="laterload" v-if="!showPreview || !hasPreview">
                <div class="preview">
                    <div
                        class="preview-underlay"
                        v-if="hasPreview || isGallery"
                        :style=" {backgroundImage: 'url(' + (isGallery ? gallerySource :previewSource) + ')'}"
                    >
                        <div class="preview-overlay"></div>
                    </div>

                    <iframe
                        v-if="article.isYoutube"
                        width="560"
                        height="315"
                        :src="'https://www.youtube-nocookie.com/embed/' + article.youtubeId + '?rel=0&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;iv_load_policy=3&amp;color=white'"
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                    ></iframe>
                    <iframe
                        v-if="article.isStreamable"
                        :src="'https://streamable.com/o/' + article.streamableId"
                        allowfullscreen
                        scrolling="no"
                        allow="encrypted-media;"
                    ></iframe>
                    <iframe
                        v-if="article.isGfyCat"
                        :src="'https://gfycat.com/ifr/' + article.gfycatId"
                        allowfullscreen
                        frameborder="0"
                        scrolling="no"
                        allow="encrypted-media;"
                    ></iframe>
                    <img
                        v-if="article.isImage"
                        :src="article.data.url"
                        alt="Image"
                        referrerpolicy="no-referrer"
                        v-on:click="showPreview = true"
                    />
                    <img
                        v-if="article.isGif"
                        :src="article.data.url"
                        alt="Gif"
                        referrerpolicy="no-referrer"
                        v-on:click="showPreview = true"
                    />
                    <img
                        v-if="isGallery"
                        :src="gallerySource"
                        alt="Gallery"
                        v-on:click="galleryIndex++"
                        referrerpolicy="no-referrer"
                    />

                    <div
                        class="text-center m-2"
                        v-if="isGallery"
                    >{{galleryIndex % galleryCount + 1}} of {{ galleryCount }}</div>

                    <article-video-player ref="player" :article="article" v-if="article.isVideo" />
                    <article-video-player-red
                        ref="red-player"
                        :article="article"
                        v-if="article.isRGif"
                    />
                    <article-video-player-gifv
                        ref="gifv-player"
                        :article="article"
                        v-if="article.isGifv"
                    />
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
export default defineComponent({
    props: {
        article: { type: Object, required: true },
    },

    data() {
        const { isGallery, isText } = this.article;

        return {
            galleryIndex: 0,
            showPreview: true,
            ...{ isGallery, isText },
        };
    },

    computed: {
        hasPreview() {
            return (
                typeof this.article.data.preview === "object" &&
                typeof this.article.data.preview.images === "object" &&
                this.article.data.preview.images.length > 0
            );
        },
        galleryCount() {
            return typeof this.article.data.media_metadata === "object"
                ? Object.keys(this.article.data.media_metadata).length
                : 0;
        },
        gallerySource() {
            if (!this.article.data.is_gallery) {
                return "";
            }
            const keys = Object.keys(this.article.data.media_metadata);
            const key = keys[this.galleryIndex % keys.length];

            const res = this.article.data.media_metadata[key].p.filter(
                (r) => r.x < 650
            );

            return this.$htmlDecode(res[res.length - 1].u);
        },

        previewSource() {
            if (typeof this.article.data.preview !== "object") {
                return "";
            }
            const image = this.article.data.preview.images[0];
            if (image.resolutions.length === 0) {
                return this.$htmlDecode(image.source.url);
            }
            const res = image.resolutions.filter((p) => p.width < 650);
            return this.$htmlDecode(res[res.length - 1].url);
        },
    },

    methods: {
        onClickPreview() {
            console.log("onclickpreview");
            // this.showPreview = false;
            this.showPreview =
                this.article.isLink && !this.article.isEmbed ? true : false;
        },
    },
    setup() {},
});
</script>

<style scoped>
.v-enter-active {
    transition: opacity 0.5s ease;
}

.v-enter-from {
    opacity: 0;
}

img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 45vh;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.laterload img {
    max-height: 80vh;
}

iframe {
    display: block;
    width: 100%;
    height: 50vh;
}
.preview {
    position: relative;
    z-index: 1;
}

.preview-overlay {
    border-radius: 20px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: block;
    background: rgba(0, 0, 0, 0.6);
    pointer-events: none;
}

.preview-underlay {
    border-radius: 20px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: center no-repeat;
    background-size: cover;
    filter: grayscale(70%) blur(4px);
    z-index: -1;
}

.play-icon {
    background: url("/images/play.svg") center no-repeat;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    pointer-events: none;
    cursor: pointer;
}
.play-icon path {
    stroke: white;
    fill: white;
}
</style>
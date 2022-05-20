<template>
    <div class="p-4 preview align-center">
        <div class="preview-underlay" :style="{backgroundImage: 'url(' + src + ')'}">
            <div class="preview-overlay"></div>
        </div>

        <img :src="previewSource" alt="preview" referrerpolicy="no-referrer" />
        <div class="preview-overlay" v-if="article.isPlayable">
            <div class="play-icon"></div>
        </div>
    </div>
</template>


<script>
export default defineComponent({
    props: {
        article: { type: Object, required: true },
    },

    computed: {
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
});
</script>


<style scoped>
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
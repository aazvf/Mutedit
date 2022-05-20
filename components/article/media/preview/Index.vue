<template>
    <div class="p-4">
        <article-media-preview-underlay :src="previewSource" />
        <div class="preview-underlay" :style="{backgroundImage: 'url(' + previewSource + ')'}">
            <div class="preview-overlay"></div>
        </div>
        <img :src="previewSource" alt="preview" referrerpolicy="no-referrer" />
        <div class="preview-overlay" v-if="article.isPlayable">
            <div class="play-icon"></div>
        </div>
    </div>
</template>


<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    setup() {},
});
</script>


<style scoped>
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
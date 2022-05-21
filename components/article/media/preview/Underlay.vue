<template>
    <div class="preview-underlay" :style="{backgroundImage: 'url(' + src + ')'}">
        <div class="preview-overlay"></div>
    </div>
</template>

<script>
export default defineComponent({
    props: {
        src: { type: String, required: true },
    },
});
</script>


<style scoped>
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
</style>
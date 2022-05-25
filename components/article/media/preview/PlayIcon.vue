<template>
    <div class="preview-overlay">
        <div class="play-icon"></div>
    </div>
</template>

<style scoped>
.preview-overlay {
    border-radius: 20px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: block;
    background: rgba(0, 0, 0, 0.4);
    pointer-events: none;
}

.play-icon {
    background: url("/images/play.svg") center no-repeat;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 30%;
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
<template>
    <div>
        <div class="video">
            <video width="1280" height="720" ref="video" controls="true" autoplay>
                <source type="video/mp4" :src="videoSource" />Your browser does not support the video tag.
            </video>
        </div>
        <div class="inline-block float-right mt-1">
            <tailwind-badge theme="yellow" v-on:click="closePreview">Close</tailwind-badge>
            <tailwind-badge theme="red" v-on:click="muteAudio">Mute</tailwind-badge>
        </div>
    </div>
</template>



<script>
export default defineComponent({
    props: {
        article: { type: Object, required: true },
    },

    data() {
        return {
            sources: [],
        };
    },

    mounted() {},

    computed: {
        videoSource() {
            return this.article.data.url.slice(0, -5) + ".mp4";
        },
        video() {
            return this.$refs["video"] || {};
        },
    },
    methods: {
        closePreview() {
            this.$parent.$parent.showPreview = true;
        },
        muteAudio() {
            this.setVolume(0);
        },
        silenceAudio() {
            this.setVolume(0.1);
        },
        setVolume(volume) {
            this.audio.volume = volume;
        },
    },
});
</script>

<style scoped>
audio {
    display: block;
    width: 100%;
    margin-bottom: 20px;
}
video {
    display: block;
    width: 100%;
    margin-bottom: 0;
    max-height: 60vh;
}
</style>
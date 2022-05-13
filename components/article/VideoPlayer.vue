<template>
    <div>
        <div class="video">
            <video
                :width="article.data.secure_media.reddit_video.width"
                :height="article.data.secure_media.reddit_video.height"
                ref="video"
                v-on:play="onPlayVideo"
                v-on:pause="onPauseVideo"
                :controls="isVideoGif"
                autoplay
            >
                <source
                    v-for="(source, index) in videoSources"
                    :key="index"
                    type="video/mp4"
                    :src="source"
                />Your browser does not support the video tag.
            </video>
            <audio
                v-if="!isVideoGif"
                controls
                ref="audio"
                v-on:play="onPlayAudio"
                v-on:pause="onPauseAudio"
            >
                <source v-on:error="article.isVideoGif = true" :src="audioSource" />
            </audio>
        </div>
        <div class="inline-block float-right mt-1">
            <tailwind-badge theme="yellow" v-on:click="closePreview">Close</tailwind-badge>
            <tailwind-badge theme="red" v-if="!isVideoGif" v-on:click="muteAudio">Mute</tailwind-badge>
        </div>
    </div>
</template>



<script>
export default defineComponent({
    props: {
        article: { type: Object, required: true },
    },
    data() {
        const { isVideoGif } = this.article;
        return {
            ...{ isVideoGif },
        };
    },
    computed: {
        videoSources() {
            return this.$getVideoSources(
                this.article.data.secure_media.reddit_video.fallback_url
            );
        },
        audioSource() {
            return this.$getAudioSource(
                this.article.data.secure_media.reddit_video.fallback_url
            );
        },
        video() {
            return this.$refs["video"] || {};
        },
        audio() {
            return this.$refs["audio"] || {};
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
        onPlayVideo() {
            if (typeof this.audio.play === "function") {
                this.syncAudioToVideo();
                this.audio.play();
            }
        },
        onPauseVideo() {
            if (typeof this.audio.play === "function") {
                this.audio.pause();
            }
        },
        onPlayAudio() {
            this.silenceAudio();
            if (typeof this.video.play === "function") {
                this.syncVideoToAudio();
                this.video.play();
            }
        },
        onPauseAudio() {
            if (typeof this.video.play === "function") {
                this.video.pause();
            }
        },
        syncAudioToVideo() {
            this.audio.currentTime = this.video.currentTime;
        },
        syncVideoToAudio() {
            this.video.currentTime = this.audio.currentTime;
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
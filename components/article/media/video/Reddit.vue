<template>
    <div>
        <div class>
            <video
                class="w-full mb-0 max-h-media"
                :width="videoWidth"
                :height="videoHeight"
                ref="video"
                v-on:play="onPlayVideo"
                v-on:pause="onPauseVideo"
                :controls="isVideoGif"
                autoplay
            >
                <source
                    v-for="(source, index) in article.videoSources"
                    :key="index"
                    type="video/mp4"
                    :src="source"
                />Your browser does not support the video tag.
            </video>
            <audio
                class="w-full mb-5"
                v-if="!isVideoGif"
                controls
                ref="audio"
                v-on:play="onPlayAudio"
                v-on:pause="onPauseAudio"
            >
                <source v-on:error="article.isVideoGif = true" :src="article.audioSource" />
            </audio>
        </div>
        <div class="inline-block float-right mt-0">
            <tailwind-badge theme="bordered" v-if="!isVideoGif" v-on:click="muteAudio">Mute</tailwind-badge>
        </div>
    </div>
</template>



<script>
export default defineComponent({
    name: "Reddit video player",
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
        isRedditVideo() {
            return (
                typeof this.article.data.secure_media.reddit_video === "object"
            );
        },
        videoWidth() {
            return this.isRedditVideo
                ? this.article.data.secure_media.reddit_video.width
                : 1280;
        },
        videoHeight() {
            return this.isRedditVideo
                ? this.article.data.secure_media.reddit_video.height
                : 720;
        },
        video() {
            return this.$refs["video"] || {};
        },
        audio() {
            return this.$refs["audio"] || {};
        },
    },
    methods: {
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

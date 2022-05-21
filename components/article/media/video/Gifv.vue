<template>
    <div>
        <div class="video">
            <video
                class="w-full mb-0 max-h-media"
                width="1280"
                height="720"
                ref="video"
                controls="true"
                autoplay
            >
                <source type="video/mp4" :src="videoSource" />Your browser does not support the video tag.
            </video>
        </div>
        <div class="inline-block float-right mt-1">
            <tailwind-badge theme="red" v-on:click="muteAudio">Mute</tailwind-badge>
        </div>
    </div>
</template>



<script>
export default defineComponent({
    name: "Gfycat video embed",
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
        muteAudio() {
            this.setVolume(0);
        },
        setVolume(volume) {
            this.audio.volume = volume;
        },
    },
});
</script>


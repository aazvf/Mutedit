<template>
    <div>
        <div class="video">
            <video width="1280" height="720" ref="video" controls="true" autoplay>
                <source
                    v-for="(source, index) in sources"
                    :key="index"
                    type="video/mp4"
                    :src="source"
                />Your browser does not support the video tag.
            </video>
        </div>
        <div class="inline-block float-right mt-1">
            <tailwind-badge theme="yellow" v-on:click="closePreview">Close</tailwind-badge>
            <tailwind-badge theme="red" v-on:click="muteAudio">Mute</tailwind-badge>
        </div>
    </div>
</template>

<script>
// import adjectives from "~/assets/data/adjectives";
// import animals from "~/assets/data/animals";
// import { capitalizeWords } from "~/assets/data/urlWords";

export default defineComponent({
    props: {
        article: { type: Object, required: true },
    },

    data() {
        return {
            sources: [],
        };
    },

    mounted() {
        this.getSources();
    },

    computed: {
        video() {
            return this.$refs["video"] || {};
        },
    },
    methods: {
        getSources() {
            // The source url can be got from the api https://api.redgifs.com/v2/gifs/{id}
            // But we can build it ourselves by converting the lowercase id to having
            //  the correct capital letters.
            //  eg acclaimedwiltedwhippoorwill becomes AcclaimedWiltedWhipPoorwill
            //  @see /plugins/ucfirst and /assets/data/urlWordlist
            let url = this.article.redgifId;
            url = this.$ucwords(url);
            url = `https://thumbs2.redgifs.com/${url}`;
            this.sources = [`${url}-mobile.mp4`, `${url}.mp4`];
        },
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
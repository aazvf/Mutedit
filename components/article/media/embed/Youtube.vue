<template>
    <iframe
        v-if="youtubeId"
        width="560"
        height="315"
        :src="'https://www.youtube-nocookie.com/embed/' + youtubeId + '?rel=0&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;iv_load_policy=3&amp;color=white'"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
    ></iframe>
</template>

<script>
export default defineComponent({
    setup() {
        this.youtubeId = this.$parent.article.youtubeId;
    },
});
</script>

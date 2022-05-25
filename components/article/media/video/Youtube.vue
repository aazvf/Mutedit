<template>
    <iframe
        width="560"
        height="315"
        :src="'https://www.youtube-nocookie.com/embed/' + src + '?rel=0&amp;controls=1&amp;showinfo=0&amp;modestbranding=1&amp;iv_load_policy=3&amp;color=white'"
        frameborder="0"
        allow="autoplay; encrypted-media"
        class="w-full max-h-fit"
        allowfullscreen
    ></iframe>
</template>

<script>
export default defineComponent({
    name: "Youtube embedded iframe",
    props: {
        src: { type: String, required: true },
    },
});
</script>


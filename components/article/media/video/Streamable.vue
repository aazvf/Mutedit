<template>
    <iframe
        v-if="src"
        :src="'https://streamable.com/o/' + src"
        allowfullscreen
        scrolling="no"
        allow="encrypted-media;"
        class="w-full max-h-media"
    ></iframe>
</template>

<script>
export default defineComponent({
    name: "Streamable embedded iframe",
    props: {
        src: { type: String, required: true },
    },
});
</script>

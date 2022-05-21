<template>
    <iframe
        v-if="src"
        :src="'https://gfycat.com/ifr/' + src"
        allowfullscreen
        frameborder="0"
        scrolling="no"
        allow="encrypted-media;"
        class="w-full max-h-media"
    ></iframe>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    props: { src: { type: String, required: true } },
});
</script>

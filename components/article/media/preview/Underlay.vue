<template>
    <div
        class="blur grayscale rounded block drop-shadow absolute top-0 left-0 w-full h-full -z-10 pointer-events-none brightness-50"
        :style="{backgroundImage: 'url(' + src + ')'}"
    ></div>
</template>

<script>
export default defineComponent({
    props: {
        src: { type: String, required: true },
    },
});
</script>

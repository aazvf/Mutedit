<template>
    <div class="preview-underlay" :style="{backgroundImage: 'url(' + src + ')'}">
        <div class="preview-overlay"></div>
    </div>
</template>

<script>
export default defineComponent({
    props: {
        src: { type: String, required: true },
    },
});
</script>

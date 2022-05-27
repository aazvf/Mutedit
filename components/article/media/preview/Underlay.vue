<template>
    <div
        class="blur bg-auto rounded block absolute top-0 left-0 w-full h-full -z-10 pointer-events-none"
        :style="{backgroundImage: 'url(' + src + ')'}"
    >
        <div :class="'w-full h-full opacity-30 ' + $theme.bg(100, true)"></div>
    </div>
</template>

<script>
export default defineComponent({
    name: "Blurred image underlay",
    props: {
        src: { type: String, required: true },
    },
});
</script>

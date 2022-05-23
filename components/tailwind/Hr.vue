<template>
    <hr :class="[theme.border2]" :attrs="$attrs" />
</template>

<script>
export default defineComponent({
    props: { attrs: { type: Object, required: false } },
    data() {
        return {
            theme: useTheme(),
        };
    },
});
</script>

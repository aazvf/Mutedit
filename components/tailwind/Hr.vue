<template>
    <hr :class="[theme.border2]" />
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
1
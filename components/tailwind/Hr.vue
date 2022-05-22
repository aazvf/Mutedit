<template>
    <hr :class="theme.border4" :attrs="$attrs" />
</template>

<script>
export default defineComponent({
    data() {
        return {
            theme: useTheme(),
        };
    },
});
</script>

<template>
    <hr :class="[$theme.border2]" />
</template>

<script>
export default defineComponent({
    name: "Hr",
    props: { attrs: { type: Object, required: false } },
});
</script>

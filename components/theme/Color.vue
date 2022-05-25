<template>
    <div :class="classNames" :attrs="$attrs">⬤</div>
</template>

<script>
export default defineComponent({
    name: "Color square",
    props: {
        color: { type: String, required: true },
        accent: { type: String, default: "", required: false },
    },
    computed: {
        classNames() {
            return [
                "cursor-pointer rounded-lg text-2xl leading-9 text-center inline-block w-10 h-10 m-3",
                `bg-${this.color}-500 text-${this.accent || this.color}-500`,
            ];
        },
    },
});
</script>

<style scoped>
.leading-squared {
    line-height: 4.3rem;
}
</style>
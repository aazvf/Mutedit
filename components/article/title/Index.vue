<template>
    <h5
        class="py-2 pb-4 px-1 text-xl font-bold tracking-tight normal-case"
        v-bind="$attrs"
    >{{ title }}</h5>
</template>



<script>
export default defineComponent({
    props: {
        article: { type: Object, required: true },
        attrs: { type: Object, required: false, default: {} },
    },
    data() {
        const title = new DOMParser().parseFromString(
            this.article.data.title,
            "text/html"
        ).documentElement.textContent;

        return {
            title,
        };
    },
});
</script>
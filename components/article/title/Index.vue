<template>
    <h5 class="mb-3 mt-0 pl-1 text-xl font-bold tracking-tight" v-bind="$attrs">{{ title }}</h5>
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
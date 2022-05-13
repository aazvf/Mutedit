<template>
    <div>
        <tailwind-badge
            v-for="(type, name) in articleTypes"
            :key="name"
            v-on:click="setType(type)"
            :theme="focusArticleType === type ? 'green' : 'default'"
        >{{ $ucfirst(name) }}</tailwind-badge>
    </div>
</template>

<script>
export default {
    data() {
        const { focusArticleType } = useFeedFilters();

        return {
            focusArticleType: focusArticleType,
            articleTypes: {
                all: "",
                link: "link",
                gallery: "gallery",
                image: "image",
                gif: "gif",
                video: "video",
                text: "text",
            },
        };
    },
    mounted() {
        console.log("PillsArticleTypes mounted.");
    },
    methods: {
        setType(type) {
            this.focusArticleType = type;
            console.log(this.focusArticleType);
        },
    },
};
</script>

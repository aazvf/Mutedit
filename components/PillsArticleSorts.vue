<template>
    <NuxtLink v-for="(name, index) in sorttypes" :href="urlForSort(name)" :key="index">
        <tailwind-badge :theme="name === sort ? 'green' : 'default'">{{ $ucfirst(name) }}</tailwind-badge>
    </NuxtLink>
</template>


<script>
export default defineComponent({
    data() {
        return {
            sorttypes: [
                "best",
                "top",
                "new",
                "controversial",
                "rising",
                "hot",
                "random",
            ],
            sort: this.$parent.sort,
        };
    },
    methods: {
        urlForSort(sort) {
            let u = "";

            if (this.$parent.query != "/" && this.$parent.query.length > 1) {
                u += this.query;
            }

            u += `/${sort}`;

            if (this.canHaveTime(sort)) {
                u += `/${this.$parent.timeperiod}`;
            }

            return u;
        },
        canHaveTime(sort) {
            return ["top", "controversial"].indexOf(sort) > -1;
        },
    },
});
</script>

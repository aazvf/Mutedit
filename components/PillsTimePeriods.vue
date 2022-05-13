<template>
    <NuxtLink v-for="(name, index) in timePeriods" :key="index" :href="urlForTimeperiod(name)">
        <tailwind-badge :theme="name === timeperiod ? 'green' : 'default'">{{ $ucfirst(name) }}</tailwind-badge>
    </NuxtLink>
</template>

<script>
import timePeriods from "~/assets/data/timePeriods";
export default {
    data() {
        const { timeperiod } = this.$parent;
        return {
            timePeriods,
            timeperiod,
        };
    },

    methods: {
        urlForTimeperiod(timeperiod) {
            let u = "";

            if (this.$parent.query != "/" && this.$parent.query.length > 1) {
                u += this.$parent.query;
            }

            u += `/${this.$parent.sort}/${timeperiod}`;

            return u;
        },
    },
};
</script>

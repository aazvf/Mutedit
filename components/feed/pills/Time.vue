<template>
    <NuxtLink
        v-for="(timeperiod, index) in timePeriods"
        :key="index"
        :href="$buildUrl({timeperiod})"
        :class="{'pointer-events-none': waiting}"
    >
        <tailwind-badge :theme="badgeTheme(timeperiod)">{{ $ucfirst(timeperiod) }}</tailwind-badge>
    </NuxtLink>
</template>

<script>
import timePeriods from "~/assets/data/timePeriods";
export default {
    name: "Time period nav buttons",
    data() {
        const activeTimeperiod = useFeedTimeperiodParam();
        return {
            timePeriods,
            activeTimeperiod,
            waiting: useWaitingForArticles(),
        };
    },
    methods: {
        badgeTheme(time) {
            return this.activeTimeperiod === time
                ? "active"
                : this.waiting
                ? "disabled"
                : "inactive";
        },
    },
};
</script>

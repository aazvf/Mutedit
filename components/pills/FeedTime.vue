<template>
    <NuxtLink
        v-for="(timeperiod, index) in timePeriods"
        :key="index"
        :href="$buildUrl({timeperiod})"
    >
        <tailwind-badge
            :theme="timeperiod === activeTimeperiod ? 'green' : 'default'"
        >{{ $ucfirst(timeperiod) }}</tailwind-badge>
    </NuxtLink>
</template>

<script>
import timePeriods from "~/assets/data/timePeriods";
export default {
    data() {
        const activeTimeperiod = useFeedTimeperiodParam();
        return {
            timePeriods,
            activeTimeperiod,
        };
    },
};
</script>

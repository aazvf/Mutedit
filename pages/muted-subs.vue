<!-- This page is shown when visiting /muted-subs -->
<!-- Allows the user to manually edit the subreddits they are muting -->

<template>
    <div>
        <NuxtLink
            :class="['px-6 mb-3 block', $theme().text5]"
            :href="$buildUrl()"
        >&lt; back to front page</NuxtLink>

        <tailwind-card>
            <h2
                class="px-5 py-3 pt-3 text-lg"
            >your {{ mutedSubs.length }} muted sub{{ $s(mutedSubs.length) }}</h2>
            <hr />
            <div class="p-5">
                <tailwind-badge
                    v-for="(sub, index) in mutedSubs"
                    :key="index"
                    v-on:click="onSubClick(sub)"
                    theme="focused"
                >r/{{ $ucfirst(sub) }}</tailwind-badge>

                <tailwind-badge
                    v-for="(sub, index) in removedSubs"
                    :key="index"
                    theme="active"
                    v-on:click="onSubClick(sub)"
                >r/{{ $ucfirst(sub) }} (removed, undo?)</tailwind-badge>
            </div>
            <hr />

            <div class="mt-5 p-5">
                <input
                    type="text"
                    class="max-w-sm mr-4 mb-3 p-2 min-w-full md:min-w-[40%] grow max-w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="sub"
                    placeholder="new muted sub"
                />
                <tailwind-badge
                    class="text-lg py-1.5 px-5"
                    :theme="sub.length > 2 ? 'active' : 'inactive'"
                    v-on:click="addNewSub"
                >add sub</tailwind-badge>
            </div>
        </tailwind-card>
        <NuxtLink
            :class="['px-6 mb-3 block', $theme().text5]"
            href="/muted-words"
        >&gt; configure muted words</NuxtLink>
    </div>
</template>

<script setup>
useHead({
    title: "muted subs",
});
</script>


<script>
export default {
    props: {},
    data() {
        return {
            ...useFeedFilters(),
            sub: "",
            removedSubs: [],
        };
    },

    computed: {},

    methods: {
        addNewSub() {
            if (this.sub.length > 2 && !this.mutedSubs.includes(this.sub)) {
                this.mutedSubs.push(this.sub);
                this.sub = "";
                this.$localstorage.saveMutedSubs();
            }
        },

        onSubClick(sub) {
            const isMuted = this.mutedSubs.includes(sub);

            if (isMuted) {
                this.mutedSubs = this.mutedSubs.filter((s) => s != sub);
                this.removedSubs.push(sub);
            } else {
                this.mutedSubs.push(sub);
                this.removedSubs = this.removedSubs.filter((s) => s !== sub);
            }

            this.$localstorage.saveMutedSubs();
        },
    },
};
</script>


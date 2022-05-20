<template>
    <div>
        <NuxtLink
            class="text-purple-300 px-6 mb-3 block"
            :href="$buildUrl()"
        >&lt; back to front page</NuxtLink>

        <tailwind-card>
            <h2 class="text-gray-200 px-5 py-3 pt-3 text-lg">your muted subs</h2>
            <hr />
            <div class="p-5">
                <tailwind-badge
                    v-for="(sub, index) in mutedSubs"
                    :key="index"
                    v-on:click="onSubClick(sub)"
                    theme="default"
                >{{ $ucfirst(sub) }}</tailwind-badge>

                <tailwind-badge
                    v-for="(sub, index) in removedSubs"
                    :key="index"
                    theme="dark"
                    v-on:click="onSubClick(sub)"
                >{{ $ucfirst(sub) }} (undo?)</tailwind-badge>
            </div>
            <hr />

            <div class="mt-5 p-5">
                <input
                    type="text"
                    class="max-w-sm mr-4 p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="sub"
                    placeholder="new muted sub"
                />
                <tailwind-button
                    :theme="sub.length > 2 ? 'yellow' : 'dark'"
                    v-on:click="addNewSub"
                >add sub</tailwind-button>
            </div>
        </tailwind-card>
        <NuxtLink
            class="text-purple-300 px-6 mb-3 block"
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
import localforage from "localforage";

export default {
    props: {},
    data() {
        return {
            ...useFeedFilters(),
            sub: "",
            removedSubs: [],
        };
    },

    mounted() {
        this.restoreSubredditRules();
    },

    computed: {},

    methods: {
        addNewSub() {
            if (this.sub.length > 2 && !this.mutedSubs.includes(this.sub)) {
                this.mutedSubs.push(this.sub);
                this.sub = "";
                this.saveSubredditRules();
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

            this.saveSubredditRules();
        },
        saveSubredditRules() {
            localforage.setItem(
                "subreddit-rules",
                JSON.stringify(this.mutedSubs)
            );
        },
        restoreSubredditRules() {
            localforage
                .getItem("subreddit-rules")
                .then((value) => {
                    value = JSON.parse(value);
                    if (
                        typeof value === "object" &&
                        Array.isArray(value) &&
                        value.length > 0
                    ) {
                        this.mutedSubs = value;
                    }
                })
                .catch(console.error);
        },
    },
};
</script>


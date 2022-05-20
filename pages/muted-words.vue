<!-- This page is shown when visiting /muted-words -->
<!-- Allows the user to manually edit the words thei are muting -->

<template>
    <div>
        <NuxtLink
            class="text-purple-300 px-6 mb-3 block"
            :href="$buildUrl()"
        >&lt; back to front page</NuxtLink>
        <tailwind-card>
            <h2 class="text-gray-200 px-5 py-3 text-lg">your muted words</h2>
            <hr />
            <div class="p-5">
                <tailwind-badge
                    v-for="(word, index) in mutedWords"
                    :key="index"
                    v-on:click="onWordClick(word)"
                    theme="default"
                >{{ $ucfirst(word) }}</tailwind-badge>

                <tailwind-badge
                    v-for="(word, index) in removedWords"
                    :key="index"
                    theme="dark"
                    v-on:click="onWordClick(word)"
                >{{ $ucfirst(word) }} (undo?)</tailwind-badge>
            </div>
            <hr />

            <div class="mt-5 p-5">
                <input
                    type="text"
                    class="max-w-sm mr-4 p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="word"
                    placeholder="new muted word"
                />
                <tailwind-button
                    :theme="word.length > 2 ? 'yellow' : 'dark'"
                    v-on:click="addNewWord"
                >add {{ word.includes(' ') ? 'phrase' : 'word' }}</tailwind-button>
            </div>
        </tailwind-card>
        <NuxtLink
            class="text-purple-300 px-6 mb-3 block"
            href="/muted-subs"
        >&gt; configure muted subs</NuxtLink>
    </div>
</template>

<script setup>
useHead({
    title: "muted words",
});
</script>



<script>
export default {
    props: {},
    data() {
        return {
            ...useFeedFilters(),
            word: "",
            removedWords: [],
        };
    },

    mounted() {
        this.$localstorage.restoreMutedWords();
    },

    computed: {},

    methods: {
        addNewWord() {
            if (this.word.length > 2 && !this.mutedWords.includes(this.word)) {
                this.mutedWords.push(this.word);
                this.word = "";
                this.$localstorage.saveMutedWords();
            }
        },
        onWordClick(word) {
            const isMuted = this.mutedWords.includes(word);

            if (isMuted) {
                this.mutedWords = this.mutedWords.filter((w) => w != word);
                this.removedWords.push(word);
            } else {
                this.mutedWords.push(word);
                this.removedWords = this.removedWords.filter((w) => w !== word);
            }
        },
    },
};
</script>

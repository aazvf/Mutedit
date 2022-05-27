<!-- This page is shown when visiting /muted-words -->
<!-- Allows the user to manually edit the words thei are muting -->

<template>
    <div>
        <NuxtLink
            :class="['px-6 mb-3 block', $theme.text5]"
            :href="$buildUrl()"
        >&lt; back to front page</NuxtLink>
        <tailwind-card>
            <h2
                class="px-5 py-3 text-lg"
            >your {{ mutedWords.length }} muted word{{ $s(mutedWords.length) }}</h2>
            <tailwind-hr />
            <div class="p-5">
                <tailwind-badge
                    v-for="(word, index) in mutedWords"
                    :key="index"
                    v-on:click="onWordClick(word)"
                    theme="focused"
                >{{ $ucfirst(word) }}</tailwind-badge>

                <tailwind-badge
                    v-for="(word, index) in removedWords"
                    :key="index"
                    theme="active"
                    v-on:click="onWordClick(word)"
                >{{ $ucfirst(word) }} (removed, undo?)</tailwind-badge>
            </div>
            <tailwind-hr />

            <div class="mt-5 p-5">
                <input
                    type="text"
                    class="max-w-sm mr-4 mb-3 p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="userWord"
                    placeholder="new muted word"
                />
                <tailwind-badge
                    class="text-lg py-1.5 px-5"
                    :theme="userWord.length > 2 ? 'active' : 'inactive'"
                    v-on:click="addNewWord"
                >add muted {{ userWord.includes(' ') ? 'phrase' : 'word' }}</tailwind-badge>
            </div>
        </tailwind-card>
        <NuxtLink
            :class="['px-6 mb-3 block', $theme.text5]"
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
            userWord: "",
            removedWords: [],
        };
    },

    computed: {},

    methods: {
        addNewWord() {
            if (
                this.userWord.length > 2 &&
                !this.mutedWords.includes(this.userWord)
            ) {
                this.mutedWords.push(this.userWord);
                this.userWord = "";
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

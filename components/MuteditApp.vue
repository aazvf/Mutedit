<template>
    <div class>
        <div>
            <header-menu />

            <hr />

            <div class="mx-3 my-1">
                <pills-feed-sort />
            </div>

            <div class="mx-3 my-1" v-if="['top', 'controversial'].includes(sort)">
                <pills-feed-time />
            </div>

            <hr />

            <div class="mx-3 my-1">
                <pills-feed-type />
            </div>
            <hr />
            <div class="mx-3 my-1">
                <pills-subreddits />
            </div>
            <pills-words />
            <feed-status-text />

            <div class="mx-3 my-1">
                <feed-toggle-options />
            </div>
        </div>
        <hr class="mb-2 mt-1" />

        <div
            v-if="selectedWord.length > 3 && !ignoredWords.includes(selectedWord)"
            id="toast-undo"
            class="fixed flex transition-all top-0 left-0 items-center w-full max-w-xs px-4 py-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-300 dark:bg-purple-600"
            role="alert"
            :style="{top: selTop + 'px', left: selLeft + 'px'}"
        >
            <div
                class="text-sm font-normal pr-2"
            >Would you like to mute this {{ selectedWord.includes(' ') ? 'phrase' : 'word' }} "{{ selectedWord }}" ?</div>
            <div class="flex items-center ml-auto space-x-2">
                <tailwind-badge theme="indigo" v-on:click="onAgreeMuteWord">Yes!</tailwind-badge>
                <tailwind-badge theme="dark" v-on:click="ignoredWords.push(selectedWord)">no</tailwind-badge>
            </div>
        </div>

        <feed-filtered-articles />

        <feed-article-fetcher />
    </div>
</template>

<script>
import { isCommonWord } from "~/assets/data/ignoredWordlist";

export default {
    data() {
        return {
            ...useFeedFilters(),

            sort: useFeedSortParam(),

            selTop: 0,
            selLeft: 0,
            selectedWord: "",
            ignoredWords: [],
        };
    },

    mounted() {
        this.$localstorage.restoreAll();

        setInterval(this.waitForSelection, 500);
    },

    computed: {},

    methods: {
        onAgreeMuteWord() {
            this.mutedWords.push({ s: this.selectedWord, w: false });
            this.$localstorage.saveMutedWords();
        },
        waitForSelection() {
            const selection = window.getSelection();
            const word = selection
                .toString()
                .trim()
                .toLowerCase()
                .replace(/[^\w\s\d]/g, "");

            if (
                word.length > 3 &&
                word.length < 40 &&
                selection.baseNode.parentElement.tagName === "H5" &&
                !isCommonWord(word)
            ) {
                const range = selection.getRangeAt(0);
                const { top, left } = range.getBoundingClientRect();
                // const { top, left } =
                // selection.focusNode.parentElement.getBoundingClientRect();
                this.selTop = top - 70;
                this.selLeft = left - 100;
                // this.selLeft = left + 9 * selection.baseOffset;
                this.selectedWord = word;
            } else {
                this.selectedWord = "";
            }
        },
    },
};
</script>

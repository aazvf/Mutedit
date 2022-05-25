<template>
    <div
        v-if="selectedWord.length > 3 && !ignoredWords.includes(selectedWord)"
        id="toast-undo"
        class="fixed flex transition-all top-0 left-0 items-center w-full max-w-xs px-4 py-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-300 dark:bg-purple-600"
        role="alert"
        :style="{top: selTop + 'px', left: selLeft + 'px'}"
    >
        <div
            class="text-sm font-normal pr-2"
        >Would you like to mute this {{ phraseOrWord }} "{{ selectedWord }}" ?</div>
        <div class="flex items-center ml-auto space-x-2">
            <tailwind-badge theme="indigo" v-on:click="onAgreeMuteWord">Yes!</tailwind-badge>
            <tailwind-badge theme="dark" v-on:click="ignoredWords.push(selectedWord)">no</tailwind-badge>
        </div>
    </div>
</template>


<script>
import { isCommonWord } from "~/assets/data/ignoredWordlist";

export default defineComponent({
    name: "Floating word muter helper",
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
        setInterval(this.waitForSelection, 500);
    },

    computed: {
        phraseOrWord() {
            return this.selectedWord.includes(" ") ? "phrase" : "word";
        },
    },

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
                this.selTop = top - 70;
                this.selLeft = left - 100;
                this.selectedWord = word;
            } else {
                this.selectedWord = "";
            }
        },
    },
});
</script>

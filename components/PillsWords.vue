<template>
    <div>
        <tailwind-badge
            v-for="(word, index) in wordmapsorted"
            :key="index"
            v-on:click="onClickWordmap(word.name)"
            :theme="badgeTheme(word)"
            :asdf="badgeTheme(word)"
        >{{ $ucfirst(word.name) }} ({{ word.count }})</tailwind-badge>
        <tailwind-badge
            theme="purple"
            v-on:click="showwordlimit += showwordbite ; showwordbite *= 1.5"
            v-if="wordcount > showwordlimit"
        >show {{ parseInt(wordcount - showwordlimit) }} more words</tailwind-badge>
    </div>
</template>

<script>
import localforage from "localforage";

export default {
    data() {
        const { focusWord } = useFeedFilters();

        return {
            showwordlimit: 10,
            showwordbite: 20,
            // wordmapsorted: this.$parent.wordmapsorted,
            showword: focusWord,
            // wordcount: this.$parent.wordcount,
            titleRulesStrings: useFeedTitlePrefs(),
            articles: useArticles(),
        };
    },
    mounted() {
        console.log("PillsWords mounted.");
    },
    computed: {
        wordcount() {
            return Object.keys(this.wordmap).length;
        },
        mutedWords() {
            return this.titleRulesStrings.map((r) => r.s);
        },
        wordmapsorted() {
            const map = this.wordmap;
            return Object.keys(map)
                .map((s) => {
                    return { name: s, count: map[s].length - 1 };
                })
                .sort((a, b) => b.count - a.count)
                .splice(0, this.showwordlimit);
        },
        wordmap() {
            const map = {};
            this.articles.forEach((a) => {
                a.specialwords.forEach((w) => {
                    map[w] =
                        typeof map[w] === "object"
                            ? map[w].indexOf(a.data.id) > -1
                                ? map[w]
                                : [...map[w], a.data.id]
                            : [w, a.data.id];
                });
            });
            return map;
        },
    },
    methods: {
        badgeTheme(word) {
            return this.showword === word.name
                ? "green"
                : this.isWordMuted(word.name)
                ? "red"
                : "default";
        },
        // ucfirst: (s) => this.$parent.ucfirst(s),
        isWordMuted(word) {
            return this.mutedWords.indexOf(word) > -1;
        },

        onClickWordmap(word) {
            console.log(this.wordmap[word]);
            const isMuted = this.isWordMuted(word);
            const isFeatured = this.showword === word;

            if (!isMuted && !isFeatured) {
                this.titleRulesStrings.push({ s: word, w: false });
                this.saveTitleRules();
            }

            if (isMuted && !isFeatured) {
                this.showword = word;
            }

            if (isFeatured) {
                this.showword = "";
                this.titleRulesStrings = this.titleRulesStrings.filter(
                    (r) => r.s != word
                );
                this.saveTitleRules();
            }
        },
        saveTitleRules() {
            localforage.setItem(
                "title-rules",
                JSON.stringify(this.titleRulesStrings)
            );
        },
    },
};
</script>

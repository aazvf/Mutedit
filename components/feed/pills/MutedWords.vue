<template>
    <div class="p-3 leading-7">
        <span class="px-1 mr-1" :class="$theme.text3">mute words:</span>
        <span class="px-1" :class="$theme.text2" v-if="wordcount === 0">loading...</span>

        <tailwind-badge
            v-for="(word, index) in wordmapsorted"
            :key="index"
            v-on:click="onClickWordmap(word.name)"
            :theme="badgeTheme(word)"
        >{{ $ucfirst(word.name) }} ({{ word.count }})</tailwind-badge>
        <tailwind-badge
            theme="bordered"
            v-on:click="focusWordlimit += focusWordbite ; focusWordbite *= 1.5"
            v-if="wordcount > focusWordlimit"
        >show {{ parseInt(wordcount - focusWordlimit) }} more words</tailwind-badge>
    </div>
</template>

<script>
export default {
    name: "Mute-able word list",
    data() {
        return {
            ...useFeedFilters(),
            articles: useArticles(),
            focusWordlimit: 10,
            focusWordbite: 20,
        };
    },
    computed: {
        wordcount() {
            return Object.keys(this.wordmap).length;
        },
        wordmapsorted() {
            const map = this.wordmap;
            return Object.keys(map)
                .map((s) => {
                    return { name: s, count: map[s].length - 1 };
                })
                .sort((a, b) => b.count - a.count)
                .splice(0, this.focusWordlimit);
        },
        wordmap() {
            const map = {};
            this.articles.forEach((a) => {
                a.words?.forEach((w) => {
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
            return this.focusWord === word.name
                ? "focused"
                : this.isWordMuted(word.name)
                ? "active"
                : "inactive";
        },
        isWordMuted(word) {
            return this.mutedWords.indexOf(word) > -1;
        },

        onClickWordmap(word) {
            if (this.isWordMuted(word)) {
                this.mutedWords = this.mutedWords.filter((r) => r != word);
            } else {
                this.mutedWords.push(word);
            }

            this.$localstorage.saveMutedWords();
        },
    },
};
</script>

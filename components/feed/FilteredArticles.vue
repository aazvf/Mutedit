<template>
    <article-layout
        v-for="(article) in filtered"
        :key="article.id"
        :article="article"
        ref="article"
    ></article-layout>
</template>


<script>
export default defineComponent({
    name: "Filtered list of articles",
    data() {
        return {
            ...useFeedFilters(),
            articles: useArticles(),
            activeFeedType: useFeedTypeParam(),
        };
    },
    methods: {
        escapeRegex(string) {
            return string
                .trim()
                .toLowerCase()
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        },
    },
    computed: {
        // Makes a regular expression out of the users muted subreddit preferences
        subredditRegex() {
            const subs = this.mutedSubs
                .filter((sub) => sub.length > 2)
                .map((sub) => this.escapeRegex(sub))
                .join("|");
            return new RegExp("^(" + subs + ")$", "i");
        },

        // Makes a regular expression out of the users muted words preferences
        // exclude words less than 3 chars, words less than 5 chars must be "whole words".
        //  ie, must have whitespace on either side or start/end of string.
        wordRegex() {
            const words = this.mutedWords
                .filter((word) => word.length > 2)
                .map((word) => this.escapeRegex(word))
                .map((word) => {
                    return word.length < 5
                        ? "(?:^| )" + word + "(?: |$)"
                        : word;
                })
                .join("|");

            return new RegExp("(" + words + ")", "i");
        },

        // Filters the array of articles only returning those which pass user preferences
        filtered() {
            // Initialise these counters each time this property is computed
            this.filterCount = 0;
            this.blockedCount = 0;
            this.articleCount = 0;

            return this.articles.filter((a) => {
                this.articleCount++;

                // If we only want to show articles containing a particular word
                //  then return whether the title includes that word
                if (this.focusWord.length > 0) {
                    return a.words.includes(this.focusWord);
                }

                // If we only want to show articles from a particular subreddit
                //  then return that check.
                if (this.focusSubreddit.length > 0) {
                    return a.data.subreddit === this.focusSubreddit;
                }

                // Check whether this is an article the user has already scrolled past
                const articleAlreadySeen = this.blocked.includes(a.id);
                if (articleAlreadySeen) {
                    this.blockedCount++;
                }

                // If we only want to show articles that the user has already seen
                // then return that check.
                if (this.showBlocked) {
                    return articleAlreadySeen;
                }

                // Check whether the article title contains any of the users muted words
                const articleTitleHasMutedWords =
                    this.mutedWords.length > 0 &&
                    this.wordRegex.test(a.data.title);

                // Check whether the article subreddit is one of the users muted subs
                const articleSubredditIsMuted =
                    this.mutedSubs.length > 0 &&
                    this.subredditRegex.test(a.data.subreddit);

                // Check whether we only want to show a certain type of article
                //  such as video, link etc
                const articleTypes = {
                    link: a.isLink,
                    image: a.isImage || a.isGallery,
                    video: a.isPlayable,
                    text: a.isText,
                };
                const articleTypeIsMuted =
                    typeof articleTypes[this.activeFeedType] === "boolean"
                        ? !articleTypes[this.activeFeedType]
                        : false;

                const muted =
                    articleTitleHasMutedWords ||
                    articleSubredditIsMuted ||
                    articleTypeIsMuted;

                // Increment to count the number of muted articles
                this.filterCount += +muted;

                // If the user wants to see articles that are usually muted
                if (this.invertFilter) {
                    return muted;
                }

                // Return that the article isnt muted and not already seen.
                return !muted && !articleAlreadySeen;
            });
        },
    },
});
</script>

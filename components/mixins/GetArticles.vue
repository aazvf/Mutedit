
<script>
import dictwords from "~/assets/data/ignoredWordlist";
import axios from "axios";

export default {
    data() {
        const {
            focusArticleType,
            focusWord,
            focusSubreddit,
            blocked,
            showBlocked,
            blockedCount,
        } = useFeedFilters();
        return {
            ...{ blocked, showBlocked, blockedCount },
            articles: useArticles(),
            // ...({ articles } = store),
            // articles: [],
            initialScrapePages: 2,
            ids: [],
            scraped: 0,
            after: "",
            showOnly: focusArticleType,
            showword: focusWord,
            showsubreddit: focusSubreddit,
            loadingArticles: false,
        };
    },
    mounted() {
        console.log("GetArticles mounted.");

        // setInterval(() => {
        //     console.log(this.showOnly);
        // }, 1000);

        this.articles = [];
        this.getAnotherPage();
    },

    computed: {
        subredditRegexGen() {
            const strings = this.subredditRulesStrings
                .map((r) => r.replace(/[^\w\_]/g, ""))
                .filter((r) => r.length > 2)
                .join("|");

            return new RegExp("^(" + strings + ")$", "i");
        },

        titleRegexGen() {
            const strings = this.titleRulesStrings
                .filter((r) => !r.w)
                .map((r) => r.s.replace(/[^\w]/g, ""))
                .filter((r) => r.length > 2)

                .join("|");
            const words = this.titleRulesStrings
                .filter((r) => r.w)
                .map((r) => r.s.replace(/[^\w\_]/g, ""))
                .filter((r) => r.length > 2)
                .map((r) => "^" + r + "\\s|\\s" + r + "\\s")
                .join("|");

            return new RegExp(
                "(" + strings + (words.length > 1 ? "|" + words : "") + ")",
                "i"
            );
        },
        filteredArticles() {
            console.log("filtering articles!!!", this.articles.length);
            this.filterCount = 0;
            this.blockedCount = 0;
            this.articleCount = 0;
            const articles = this.articles.filter((a) => {
                this.articleCount++;

                if (this.showword.length > 0) {
                    return a.specialwords.indexOf(this.showword) > -1;
                    // return this.wordmap[this.showword].indexOf(a.data.id) > -1;
                }

                if (this.showsubreddit.length > 0) {
                    return a.data.subreddit === this.showsubreddit;
                    return (
                        this.subredditmap[this.showsubreddit].indexOf(
                            a.data.id
                        ) > -1
                    );
                }

                const matches = this.titleRegexGen.test(a.data.title);

                const submatches = this.subredditRegexGen.test(
                    a.data.subreddit
                );

                const filtermap = {
                    link: a.isLink,
                    gallery: a.isGallery,
                    image: a.isImage,
                    gif: a.isGif || a.isGfyCat,
                    video: a.isVideo || a.isEmbed,
                    text: a.isText,
                };

                const showFiltered =
                    this.showOnly.length > 0
                        ? typeof filtermap[this.showOnly] === "boolean"
                            ? filtermap[this.showOnly]
                            : false
                        : true;

                const isntBlocked = !this.blocked.includes(a.id);
                if (!isntBlocked) {
                    this.blockedCount++;
                }

                let show =
                    showFiltered && !submatches && !matches && isntBlocked;
                show = this.filterToggle ? show : !show;
                show = this.showBlocked ? !isntBlocked : show;
                this.filterCount += show ? 0 : 1;
                return show;
            });
            return articles;
            // return this.showBlocked ? articles.reverse() : articles;
        },
    },

    methods: {
        getAnotherPage() {
            console.log("getanotherpage");
            this.loadingArticles = true;
            this.getPage(this.after);
        },
        extractWords(words) {
            const matches = words.match(/\b(\w+)\b/g);
            if (null === matches) {
                return ["error"];
            }
            // return matches;
            return matches
                .filter((w) => {
                    if (/^\d+$/.test(w)) {
                        return false;
                    }
                    return dictwords.indexOf(w.toLowerCase()) < 0;
                })
                .map((w) => w.toLowerCase());

            return words;
        },
        getPage(after = "") {
            console.log("getpage", after);
            const fallbackStopLoading = setTimeout(() => {
                this.loadingArticles = false;
            }, 10000);
            const q = this.query === "/" ? this.query : this.query + "/";
            const url =
                "https://www.reddit.com" +
                q +
                this.sort +
                ".json" +
                "?limit=25" +
                (after.length > 1 ? "&after=" + after : "") +
                "&t=" +
                this.timeperiod;

            axios.get(url).then((response) => {
                console.log(response);
                this.after = response.data.data.after;

                const articles = response.data.data.children
                    .filter((a) => this.ids.indexOf(a.data.id) === -1)
                    .filter((a) => !a.data.stickied && !a.data.pinned)
                    // .filter((a) => a.data.is_gallery)
                    .map((a) => {
                        this.ids.push(a.data.id);
                        // console.log(a.data);

                        const title = a.data.title;

                        const specialwords = this.extractWords(title);

                        const articleYoutubeId = this.getYoutubeIdFromURL(
                            a.data.url
                        );
                        const isYoutube = articleYoutubeId.length > 3;

                        const streamableId = this.getStreamableIdFromURL(
                            a.data.url
                        );
                        const isStreamable = streamableId.length > 3;

                        const gfycatId = this.getGfycatIdFromURL(a.data.url);

                        const isGfyCat = gfycatId.length > 8;

                        const article = {
                            specialwords: specialwords,
                            hiding: false,
                            loadingComments: false,
                            data: a.data,
                            comments: [],
                            galleryCount:
                                typeof a.data.media_metadata === "object"
                                    ? Object.keys(a.data.media_metadata).length
                                    : 0,

                            id: a.data.id,
                            isLink: true,
                            isText: a.data.is_self,
                            isImage: this.$isImage(a.data.url),
                            isGif: this.$isGif(a.data.url),
                            isGallery: a.data.is_gallery,
                            isVideo: a.data.is_video,
                            isVideoGif:
                                a.data.is_video &&
                                a.data.secure_media.reddit_video.is_gif,
                            isPlayable: false,
                            isEmbed: isYoutube || isStreamable || isGfyCat,
                            isYoutube: isYoutube,
                            youtubeId: articleYoutubeId,
                            isStreamable: isStreamable,
                            streamableId: streamableId,
                            gfycatId: gfycatId,
                            isGfyCat: isGfyCat,
                        };
                        article.isPlayable =
                            article.isVideo || article.isGif || article.isEmbed;

                        article.isLink = !(
                            article.isText ||
                            article.isImage ||
                            article.isGallery ||
                            article.isGif ||
                            article.isVideo ||
                            article.isVideoGif
                        );

                        return article;
                    });

                this.articles.push(...articles);
                console.log(this.articles);

                this.scraped++;
                if (this.scraped < this.initialScrapePages) {
                    this.getPage(this.after);
                } else {
                    this.autoload = true;
                    this.loadingArticles = false;
                    console.log("loadingarticles");
                    console.log(this.loadingArticles);
                    clearTimeout(fallbackStopLoading);
                }
            });
        },
        getYoutubeIdFromURL(url) {
            var regExp =
                /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match = url.match(regExp);
            return match && match[7].length == 11 ? match[7] : false;
        },

        getStreamableIdFromURL(url) {
            const regexp = /^https:\/\/streamable\.com\/([a-zA-Z0-9]{3,9})$/;
            const match = url.match(regexp);
            return match && match[1].length > 3 ? match[1] : false;
        },

        getGfycatIdFromURL(url) {
            const regexp = /^https:\/\/gfycat\.com\/([a-zA-Z]{8,50})$/;
            const match = url.match(regexp);
            return match && match[1].length > 8 ? match[1] : false;
        },
    },
};
</script>

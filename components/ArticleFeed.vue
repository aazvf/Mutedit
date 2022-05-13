<template>
    <div class>
        <!-- <div class="row mx-0 justify-content-center mt-4"> -->
        <div class>
            <HeaderNav />

            <hr />

            <div class="mx-3 my-1">
                <pills-article-sorts />
            </div>

            <div class="mx-3 my-1" v-if="['top', 'controversial'].includes(sort)">
                <pills-time-periods />
            </div>

            <hr />

            <div class="mx-3 my-1">
                <pills-article-types />
            </div>
            <hr />
            <div class="mx-3 my-1">
                <pills-subreddits />
            </div>
            <hr v-if="articles.length > 0" />
            <div class="mx-3 my-1">
                <pills-words />
            </div>
            <hr v-if="articles.length > 0" />
            <status-text />
            <div class="mx-3 my-1">
                <tailwind-toggle
                    v-if="blockedCount > 0"
                    :value="showBlocked"
                    v-on:toggle="showBlocked = !showBlocked; filterToggle = true"
                >show {{ blockedCount }} article{{ $s(blockedCount) }} you've already seen</tailwind-toggle>

                <tailwind-toggle
                    v-if="filterCount > 0"
                    :value="!filterToggle"
                    v-on:toggle="filterToggle = !filterToggle; showBlocked = false"
                >show {{ filterCount }} article{{ filterCount > 1 ? 's' : '' }} muted by your filters</tailwind-toggle>
            </div>
        </div>
        <hr class="mb-2 mt-1" />
        <ArticleItem
            v-for="(article) in filteredArticles"
            :key="article.id"
            :article="article"
            ref="article"
        ></ArticleItem>

        <load-more-button />
    </div>
</template>

<script>
import SubredditRulesConfig from "./SubredditRules.vue";
import TitleRulesConfig from "./TitleRules.vue";
import PillsSubreddits from "./PillsSubreddits.vue";
import PillsArticleTypes from "./PillsArticleTypes.vue";
import PillsTimePeriods from "./PillsTimePeriods.vue";
import PillsArticleSorts from "./PillsArticleSorts.vue";
import PillsWords from "./PillsWords.vue";
import StatusText from "./StatusText.vue";
import ConfigState from "./mixins/ConfigState.vue";
import LoadMoreButton from "./LoadMoreButton.vue";
import HeaderNav from "./HeaderNav.vue";
import GetArticles from "./mixins/GetArticles.vue";
import ArticleItem from "./Article.vue";

export default {
    mixins: [ConfigState, GetArticles],
    components: {
        ArticleItem,
        HeaderNav,
        SubredditRulesConfig,
        TitleRulesConfig,
        PillsSubreddits,
        PillsArticleTypes,
        PillsTimePeriods,
        PillsWords,
        PillsArticleSorts,
        StatusText,
        LoadMoreButton,
    },
    props: {
        timeperiod: { type: String, default: "day" },
        sort: { type: String, default: "best" },
        query: { type: String, default: "/" },
    },
    data() {
        const { invertFilter } = useFeedFilters();
        return {
            dev: false,

            // showOnly: "",

            // wordmap: {},

            showsubredditlimit: 10,
            showsubredditbite: 20,
            showwordlimit: 10,
            showwordbite: 20,
            // showword: "",
            // showsubreddit: "",

            showTitleRules: false,
            showSubredditRules: false,
            initialScrapePages: 2,
            username: "",
            started: false,
            // articles: [],
            filtered: [],
            ids: [],
            scraped: 0,
            after: "",
            filterCount: 0,
            articleCount: 0,
            filterToggle: true,

            blocked: [],
        };
    },

    mounted() {
        console.log(this.$ucfirst("asdf"));
    },

    computed: {},

    methods: {
        urlForTimeperiod(timeperiod) {
            let u = "";

            if (this.query != "/" && this.query.length > 1) {
                u += this.query;
            }

            u += `/${this.sort}/${timeperiod}`;

            return u;
        },

        btoa(string) {
            return Buffer.from(string).toString("base64");
        },

        isArray(value) {
            return (
                typeof value === "object" &&
                Array.isArray(value) &&
                value.length > 0
            );
        },
        debugRules() {
            // console.log(this.titleRulesStrings);
            // console.log(this.titleRegexGen);
        },

        onCardDraggedLeft(article) {
            article.hiding = true;
            setTimeout(() => {
                article.left = true;
                article.right = false;
                this.blocked.push(article.id);
                localforage.setItem("blocked", this.blocked);
            }, 500);
        },
        onCardDraggedRight(article) {
            article.hiding = true;
            setTimeout(() => {
                article.left = false;
                article.right = true;
            }, 500);
        },
    },
};
</script>

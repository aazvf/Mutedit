
<script>
import localforage from "localforage";
export default {
    data() {
        return {
            subredditRulesStrings: useFeedSubredditPrefs(),
            titleRulesStrings: useFeedTitlePrefs(),
        };
    },
    mounted() {
        console.log("ConfigState mounted.");
        this.restoreConfig();
        // this.$on("save-title-rules", this.saveTitleRules);
        // this.$on("save-subreddit-rules", this.saveTitleRules);
        // this.$on("reset-rules", this.saveTitleRules);
    },

    methods: {
        saveTitleRules() {
            this.showTitleRules = false;
            localforage.setItem(
                "title-rules",
                JSON.stringify(this.titleRulesStrings)
            );
        },
        saveSubredditRules() {
            this.showSubredditRules = false;
            localforage.setItem(
                "subreddit-rules",
                JSON.stringify(this.subredditRulesStrings)
            );
        },

        resetBlocked() {
            this.blocked = [];
            localforage.setItem("blocked", []);
        },

        restoreConfig() {
            this.restoreTitleRules();
            this.restoreSubredditRules();
            this.restoreBlockedRules();
        },

        restoreTitleRules() {
            localforage
                .getItem("title-rules")
                .then((value) => {
                    value = JSON.parse(value);
                    if (
                        typeof value === "object" &&
                        Array.isArray(value) &&
                        value.length > 0
                    ) {
                        this.titleRulesStrings = value;
                    }
                })
                .catch(console.error);
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
                        this.subredditRulesStrings = value;
                    }
                })
                .catch(console.error);
        },
        restoreBlockedRules() {
            localforage
                .getItem("blocked")
                .then((value) => {
                    if (typeof value === "object" && Array.isArray(value)) {
                        this.blocked = value;
                    }
                })
                .catch(console.error);
        },
    },
};
</script>

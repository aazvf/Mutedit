
<script>
import localforage from "localforage";
export default {
    data() {
        return {
            ...useFeedFilters(),
        };
    },
    mounted() {
        console.log("ConfigState mounted.");
        this.restoreConfig();
    },

    methods: {
        saveTitleRules() {
            localforage.setItem("title-rules", JSON.stringify(this.mutedWords));
        },
        saveSubredditRules() {
            localforage.setItem(
                "subreddit-rules",
                JSON.stringify(this.mutedSubs)
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
                        this.mutedWords = value;
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
                        this.mutedSubs = value;
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

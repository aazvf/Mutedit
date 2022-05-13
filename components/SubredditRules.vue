<template>
    <div class="card bg-dark mb-5">
        <div class="card-header">
            Subreddit exclusion term
            <div class="float-end">Remove?</div>
        </div>
        <div class="card-body">
            <div
                class="input-group mb-2"
                v-for="(string, index) in subredditRulesStrings"
                :key="index"
            >
                <input type="text" class="form-control" v-model="subredditRulesStrings[index]" />
                <span class="input-group-text" v-on:click="subredditRulesStrings.splice(index, 1)">
                    <img height="100%" width="23px" src="/images/trash.svg" alt="Remove" />
                </span>
            </div>
        </div>
        <div class="card-footer">
            <a
                class="btn btn-success"
                v-on:click="subredditRulesStrings.push('')"
            >+ Add subreddit rule</a>
            <a class="btn btn-warning float-end" v-on:click="saveSubredditRules">Save and close</a>
        </div>
    </div>
</template>

<script>
import localforage from "localforage";

export default {
    props: {},
    data() {
        return {
            subredditRulesStrings: useFeedSubredditPrefs(),
        };
    },

    mounted() {
        console.log("mounted subreddit prefs");
        console.log(this.subredditRulesStrings);
        this.restoreSubredditRules();
    },

    computed: {},

    methods: {
        saveSubredditRules() {
            localforage.setItem(
                "subreddit-rules",
                JSON.stringify(this.subredditRulesStrings)
            );
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
    },
};
</script>

<template>
    <div class="card bg-dark mb-5">
        <div class="card-header">
            Title exclusion term
            <div class="float-end">Whole word? Remove?</div>
        </div>
        <div class="card-body">
            <div class="input-group mb-2" v-for="(string, index) in titleRulesStrings" :key="index">
                <input type="text" class="form-control" v-model="titleRulesStrings[index].s" />
                <span class="input-group-text">
                    <input type="checkbox" v-model="titleRulesStrings[index].w" />
                </span>
                <span class="input-group-text" v-on:click="titleRulesStrings.splice(index, 1)">
                    <img height="100%" width="23px" src="/images/trash.svg" alt="Remove" />
                </span>
            </div>
        </div>
        <div class="card-footer">
            <a
                class="btn btn-success"
                v-on:click="titleRulesStrings.push({s: '', w:false})"
            >+ Add string rule</a>
            <a class="btn btn-warning float-end" v-on:click="saveTitleRules">Save and close</a>
        </div>
    </div>
</template>

<script>
import localforage from "localforage";

export default {
    props: {},
    data() {
        return {
            titleRulesStrings: useFeedTitlePrefs(),
        };
    },

    mounted() {
        this.restoreTitleRules();
    },

    computed: {},

    methods: {
        saveTitleRules() {
            localforage.setItem(
                "title-rules",
                JSON.stringify(this.titleRulesStrings)
            );
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
    },
};
</script>

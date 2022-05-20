// Wrapper methods around localforage that can be accessed anywhere
// in the vue app with eg this.$localstorage.saveMutedWords();

import localforage from "localforage";

class storageApi {
    constructor() {
        this.filters = useFeedFilters();
    }

    saveMutedWords() {
        localforage.setItem("muted-words", JSON.stringify(this.filters.mutedWords.value));
    }
    saveMutedSubs() {
        localforage.setItem("muted-subs", JSON.stringify(this.filters.mutedSubs.value));
    }
    resetBlocked() {
        this.filters.blocked = [];
        localforage.setItem("blocked-ids", []);
    }
    restoreAll() {
        console.log(this.filters);
        this.restoreMutedWords();
        this.restoreMutedSubs();
        this.restoreBlocked();
    }
    restoreMutedWords() {
        localforage
            .getItem("muted-words")
            .then((value) => {
                value = JSON.parse(value);
                if (typeof value === "object" && Array.isArray(value) && value.length > 0) {
                    this.filters.mutedWords.value = value;
                }
            })
            .catch(console.error);
    }
    restoreMutedSubs() {
        localforage
            .getItem("muted-subs")
            .then((value) => {
                value = JSON.parse(value);
                if (typeof value === "object" && Array.isArray(value) && value.length > 0) {
                    this.filters.mutedSubs.value = value;
                }
            })
            .catch(console.error);
    }
    restoreBlocked() {
        localforage
            .getItem("blocked-ids")
            .then((value) => {
                value = JSON.parse(value);
                if (typeof value === "object" && Array.isArray(value) && value.length > 0) {
                    this.filters.blocked.value = value;
                }
            })
            .catch(console.error);
    }
}

// expose an instance of this class as the plugin
export default defineNuxtPlugin(() => {
    return {
        provide: {
            localstorage: new storageApi(),
        },
    };
});

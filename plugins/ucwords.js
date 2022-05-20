// converts lowercase gfycat ids to their uppercase versions.
// eg acclaimedwiltedwhippoorwill becomes AcclaimedWiltedWhipPoorwill

import wordRegex from "~/assets/data/urlWords";

const ucwords = (string) => {
    return string.replace(new RegExp(wordRegex, "ig"), (word) => word[0].toUpperCase() + word.slice(1).toLowerCase());
};

export default defineNuxtPlugin(() => {
    return {
        provide: {
            ucwords,
        },
    };
});

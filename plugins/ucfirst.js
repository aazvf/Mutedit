import wordRegex from "~/assets/data/urlWords";

const ucfirst = (str) => str[0].toUpperCase() + str.slice(1);

const ucwords = (string) => {
    return string.replace(new RegExp(wordRegex, "ig"), (word) => {
        console.log(ucfirst(word.toLowerCase()));
        return ucfirst(word.toLowerCase());
    });
};

export default defineNuxtPlugin(() => {
    return {
        provide: {
            ucfirst,
            ucwords,
        },
    };
});

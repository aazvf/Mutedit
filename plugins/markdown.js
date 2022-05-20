// Wrapper around showdown.js which converts markdown text to real markup.
// Used to make "selftext" articles and comments into rich text

import showdown from "showdown";

// Adds custom extensions to showdown so we can open links in new tab and
//  add make text surrounded by == turn gray.
const converter = new showdown.Converter({
    simplifiedAutoLink: true,
    extensions: [
        {
            type: "output",
            regex: new RegExp(`==(.*)==`, "g"),
            replace: `<span class="text-gray-500">$1</span>`,
        },
        {
            type: "output",
            regex: new RegExp(`<a(.*)>`, "g"),
            replace: `<a target="_blank" rel="noopener noreferer" $1>`,
        },
    ],
});

export default defineNuxtPlugin(() => {
    return {
        provide: {
            markdown: (text) => {
                return converter.makeHtml(text);
            },
        },
    };
});

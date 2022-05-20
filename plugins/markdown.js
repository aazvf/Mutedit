import showdown from "showdown";

// use showdownjs with a custom extension to open links in new tab
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

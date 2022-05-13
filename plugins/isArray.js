export default defineNuxtPlugin(() => {
    return {
        provide: {
            htmlDecode: (value) => {
                var doc = new DOMParser().parseFromString(value, "text/html");
                return doc.documentElement.textContent;
            },
        },
    };
});

export default defineNuxtPlugin(() => {
    return {
        provide: {
            isGif: (url) => {
                return [".gif"].indexOf(url.substr(-4).toLowerCase()) > -1;
            },
        },
    };
});

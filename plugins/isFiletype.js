export default defineNuxtPlugin(() => {
    return {
        provide: {
            isFileType: (url, types) => {
                return types.indexOf(url.substr(-4).toLowerCase()) > -1;
            },
        },
    };
});

export default defineNuxtPlugin(() => {
    return {
        provide: {
            isImage: (url) => {
                return [".jpg", "jpeg", ".png"].indexOf(url.substr(-4).toLowerCase()) > -1;
            },
        },
    };
});

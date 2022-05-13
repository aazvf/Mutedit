export default defineNuxtPlugin(() => {
    return {
        provide: {
            ucfirst: (str) => str[0].toUpperCase() + str.slice(1),
        },
    };
});

export default defineNuxtPlugin(() => {
    return {
        provide: {
            s: (integer) => {
                return integer === 1 ? "" : "s";
            },
        },
    };
});

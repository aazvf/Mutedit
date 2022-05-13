export default defineNuxtPlugin(() => {
    return {
        provide: {
            isArray: (value) => {
                return typeof value === "object" && Array.isArray(value) && value.length > 0;
            },
        },
    };
});

const theme = () => useTheme().value;

export default defineNuxtPlugin(() => {
    return {
        provide: {
            theme,
        },
    };
});

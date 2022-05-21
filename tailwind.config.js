module.exports = {
    darkMode: "class",
    content: [],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        "dark",
        {
            pattern:
                /(bg|text)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(100|200|500|800|900)/,
            variants: ["dark"],
        },
    ],
};

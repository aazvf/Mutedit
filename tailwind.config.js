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
                /(bg|text|border|fill)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(100|200|300|400|500|600|700|800|900)/,
            variants: ["dark", "peer-checked"],
        },
    ],
};

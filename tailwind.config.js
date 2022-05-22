module.exports = {
    darkMode: "class",
    content: [],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        {
            pattern:
                /(bg|text|border)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(100|200|300|400|500|600|700|800|900)/,
            variants: ["dark"],
        },
        {
            pattern:
                /(fill)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(300|700)/,
            variants: ["peer-checked"],
        },
    ],
};

// tailwind.config.js
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                "ma": ['var(--font-ma-shan-zheng)'],
                "mono": ['var(--font-roboto-mono)'],
            },
        },
    },
    plugins: [],
}
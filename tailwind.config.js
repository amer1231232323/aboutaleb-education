/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#F4B400', // Yellow
                    dark: '#E6A800',   // Darker yellow for hover
                },
                secondary: {
                    DEFAULT: '#D32F2F', // Red
                    dark: '#B92525',   // Darker red for hover/actions
                },
                background: {
                    DEFAULT: '#FFFFFF', // White background
                },
                text: {
                    DEFAULT: '#1F2937', // Dark gray for text
                    light: '#6B7280',
                },
            },
        },
    },
    plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['"DM Serif Display"', 'Cairo', 'Georgia', 'serif'],
                body: ['Cairo', 'Segoe UI', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#0D5C63',   // Teal
                    light: '#0F7A83',
                    dark: '#0A3D42',
                },
                secondary: {
                    DEFAULT: '#C9A227',   // Amber
                    light: '#E5C04A',
                    dark: '#A6851E',
                },
                background: {
                    DEFAULT: '#FAF8F5',   // Warm off-white
                },
                text: {
                    DEFAULT: '#2A2724',
                    light: '#4A453E',
                },
            },
        },
    },
    plugins: [],
}

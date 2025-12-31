/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#2F9E44", // Example green from analysis
                    hover: "#2b8a3e",
                },
                background: "#F8F9FA",
                card: "#FFFFFF",
                text: {
                    primary: "#1F2937",
                    secondary: "#6B7280"
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                'lg': '1rem',
                'xl': '1.5rem',
            }
        },
    },
    plugins: [],
}

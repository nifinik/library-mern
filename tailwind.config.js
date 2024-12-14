/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#212025",
        light: "#F8F8FA",
        primary: "#4F46E5",
        secondary: "#3B82F6",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				theme: ["'IBM Plex Sans'", "sans-serif"],
			},
			colors: {
				primary: "#FFF",
				secondary: "#000",
				gray: {
					DEFAULT: "#5B5B5B",
					light: "#A6A6A6",
				},
				green: {
					DEFAULT: "#00C01F",
				},
				red: {
					DEFAULT: "#EF0000",
				},
			},
			borderRadius: {
				rounded: {
					DEFAULT: "8px",
					lg: "12px",
					xl: "32px",
				},
			},
		},
	},
	plugins: [],
};

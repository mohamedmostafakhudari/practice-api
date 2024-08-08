/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,ts}"],
	theme: {
		container: {
			center: true,
			padding: "1rem",
		},
		extend: {
			animation: {
				"scale-up": "scale-up 0.5s ease-in-out forwards",
				"scale-down": "scale-down 0.5s ease-in-out forwards",
			},
			keyframes: {
				"scale-up": {
					"0%": { transform: "scale(0%)" },
					"100%": { transform: "scale(100%)" },
				},
				"scale-down": {
					"0%": { transform: "scale(100%)" },
					"100%": { transform: "scale(0%)" },
				},
			},
		},
	},
	plugins: [],
};

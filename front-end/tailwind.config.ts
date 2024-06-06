import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: 'rgba(var(--primary-color))',
				secondary: 'rgba(var(--secondary-color))',
				muted: 'rgba(var(--muted-color))',
				accent: 'rgba(var(--accent-color))',
				background: 'rgba(var(--background-color))',
				text: 'rgba(var(--text-color))',
				border: 'rgba(var(--botder-color))',
				danger: 'rgba(var(--danger-color))',
			},
		},
	},
	plugins: [],
};
export default config;

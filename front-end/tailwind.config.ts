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
				primary: 'rgba(var(--primary))',
				secondary: 'rgba(var(--secondary))',
				muted: 'rgba(var(--muted))',
				accent: 'rgba(var(--accent))',
				background: 'rgba(var(--background))',
				foreground: 'rgba(var(--foreground))',
				border: 'rgba(var(--border))',
				danger: 'rgba(var(--danger))',
			},
		},
	},
	plugins: [],
};
export default config;

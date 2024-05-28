import { COLORS } from './src/constants/colors.constants';
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
				// background: 'var(--background-color)',
				// primary: 'var(--primary-color)',
				// secondary: 'var(--secondary-color)',
				// text: 'var(--text-color)',
				// border: 'var(--border-color)',
				// accent: 'var(--accent-color)',
				// danger: 'var(--danger-color)',
				background: COLORS.BACKGROUND,
				primary: COLORS.PRIMARY,
				text: COLORS.TEXT,
				border: COLORS.BORDER,
				accent: COLORS.ACCENT,
				danger: COLORS.DANGER,
			},
		},
	},
	plugins: [],
};
export default config;

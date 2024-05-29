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
				primary: COLORS.PRIMARY,
				muted: COLORS.MUTED,
				accent: COLORS.ACCENT,
				background: COLORS.BACKGROUND,
				text: COLORS.TEXT,
				border: COLORS.BORDER,
				danger: COLORS.DANGER,
			},
		},
	},
	plugins: [],
};
export default config;

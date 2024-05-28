'use client';

import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { THEMES } from '@/constants/themes.constants';

export const ThemeSwitcher = ({ className }: React.ComponentProps<'div'>) => {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted)
		return (
			<div className={className} title='Theme switcher placeholder'>
				<SunMoon size={40} strokeWidth={1} />
			</div>
		);

	if (resolvedTheme === THEMES.DARK)
		return (
			<div className={className} title='Switch to light theme'>
				<Moon size={40} strokeWidth={1} onClick={() => setTheme(THEMES.LIGHT)} />
			</div>
		);

	if (resolvedTheme === THEMES.LIGHT)
		return (
			<div className={className} title='Switch to dark theme'>
				<Sun size={40} strokeWidth={1} onClick={() => setTheme(THEMES.DARK)} />
			</div>
		);
};

'use client';

import clsx from 'clsx';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { THEMES } from '@/constants/themes.constants';
import { Skeleton } from './Skeleton';

export const ThemeSwitcher = ({
	className,
	size,
}: React.ComponentProps<'svg'> & { size: number }) => {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	const setThemeSmooth = (theme: string) => {
		document.documentElement.classList.add(THEMES.THEME_TRANSITION);

		setTheme(theme);

		setTimeout(() => {
			document.documentElement.classList.remove(THEMES.THEME_TRANSITION);
		}, 200);
	};

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return <Skeleton className={className} style={{ width: size + 'px', height: size + 'px' }} />;
	}

	if (resolvedTheme === THEMES.DARK)
		return (
			<Moon
				size={size}
				strokeWidth={1}
				onClick={() => setThemeSmooth(THEMES.LIGHT)}
				className={clsx(className, 'cursor-pointer')}
			/>
		);

	if (resolvedTheme === THEMES.LIGHT)
		return (
			<Sun
				size={size}
				strokeWidth={1}
				onClick={() => setThemeSmooth(THEMES.DARK)}
				className={clsx(className, 'cursor-pointer')}
			/>
		);
};
